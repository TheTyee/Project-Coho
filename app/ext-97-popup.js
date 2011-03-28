// the "add to home screen" overlay

// the iPhone/iPod version
if ((Ext.is.iPhone || Ext.is.iPod) && !Ext.is.Standalone) {
    if (!this.popup) {
        // portrait or landscape?
        var position;
        if (Ext.Viewport.getOrientation() == 'portrait')
            position = "left: 15px; top: 312px;";
        else
            position = "left: 95px; top: 165px;";

        this.popup = new Ext.Panel({
            cls: 'homescreen-popup',
            floating: true,
            style: 'background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.8, #070f23), color-stop(0.84, #1c2335),color-stop(1, #8e9199)); padding: 8px 4px 0 4px;'+position,
            centered: false,
            width: 290,
            height: 102,
            html: '<p style="color: white;text-align:center;">Install the Tyee web app on your device. Tap the arrow icon below and then "Add to Home Screen"<br>&#x25bc;</p>',
        });
    }

    this.popup.show('pop');
}
// the iPad version
else if (Ext.is.iPad && !Ext.is.Standalone) {
    if (!this.popup) {
        this.popup = new Ext.Panel({
            cls: 'homescreen-popup',
            floating: true,
            style: 'background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.8, #070f23), color-stop(0.84, #1c2335),color-stop(1, #8e9199)); left: 198px; top: 6px; padding: 12px 8px 8px 8px;',
            centered: false,
            width: 320,
            height: 102,
            html: '<div style="color: white; float: left;">&#x25b2;&nbsp;</div><div style="color: white; float: right;width: 270px;">Install the Tyee web app on your iPad. Tap the arrow icon above and then "Add to Home Screen"</div>',
        });
    }

    this.popup.show('pop');
}


