// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function setScreenshotUrl(url, page) {
	upload(url, page);
}

function upload(file, page) {
    
    $('#copy').hide();

	var a = file.split(',');
	console.log(a[1])
    console.log(page)

    $.ajax({
        url: 'http://api.imgur.com/2/upload.json',
        type: 'POST',
        data: {
            type: 'base64',
            key: 'b509f289883130db7a6c900f76b70d11',
            name: 'neoasdsadn',
            title: page.title,
            caption: 'Uploaded by screenshotty',
            image: a[1]
        },
        dataType: 'json'
    }).success(function(data) {
        $('#copy').show();
        $('#loading').hide();
        $('#image').append('<img src="' + data.upload.links.original + '" />');
        $('#to_copy').append('!['+  data.upload.image.title + '](' + data.upload.links.original + ')');

    }).error(function(a, b, c) {
    	console.log(a)
    	console.log(b)
    	console.log(c)
        alert('Could not reach api.imgur.com. Sorry :(');
    });
}

function copyToClipboard( text ){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}

$('#copy').live('click', function() {
    $('#to_copy').addClass('copied');
    copyToClipboard($('#to_copy').text());
});