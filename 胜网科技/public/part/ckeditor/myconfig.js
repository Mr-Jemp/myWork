/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.toolbar = [
        ['Undo', 'Redo', 'Bold', 'Italic','Underline','TextColor'],
        [ 'Image','Table','HorizontalRule','Smiley','SpecialChar','jme' ]
    ];
    config.extraPlugins = 'jme';
    config.allowedContent=true;
};
