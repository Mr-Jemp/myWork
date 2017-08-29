/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.toolbar = [
        ['Undo', 'Redo', 'Bold', 'Italic','Underline','Strike','TextColor','JustifyLeft','JustifyCenter','JustifyRight'],
        ['Format','Font','FontSize'],
        [ 'Image','Table','HorizontalRule','Smiley','SpecialChar','jme']
    ];
    config.extraPlugins = 'jme';
    config.allowedContent=true;
    config.enterMode = CKEDITOR.ENTER_BR;
    config.shiftEnterMode = CKEDITOR.ENTER_BR;
    /*config.fullPage=true;*/
};
