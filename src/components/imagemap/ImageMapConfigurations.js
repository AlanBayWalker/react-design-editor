import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageMapConfigurations extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
        selectedItem: PropTypes.object,
        onChange: PropTypes.func,
    }

    render() {
        const {
            onChange,
            selectedItem,
            canvasRef,
        } = this.props;

        const map = {
            workarea: {
                name: canvasRef ? canvasRef.workarea.name : null,
                layout: canvasRef ? canvasRef.workarea.layout : null,
                width: canvasRef ? canvasRef.workarea.width : null,
                height: canvasRef ? canvasRef.workarea.height : null,
            },
        };

        const generalValues = {
            height: selectedItem ? selectedItem.height : null,
            left: selectedItem ? selectedItem.left : null,
            lock: selectedItem ? selectedItem.lock : null,
            name: selectedItem ? selectedItem.name : null,
            top: selectedItem ? selectedItem.top : null,
            visible: selectedItem ? selectedItem.visible : null,
            width: selectedItem ? selectedItem.width : null,
        };
        const textValues = {
            charSpacing: selectedItem ? selectedItem.charSpacing : null,
            fontFamily: selectedItem ? selectedItem.fontFamily : null,
            fontSize: selectedItem ? selectedItem.fontSize : null,
            fontStyle: selectedItem ? selectedItem.fontStyle : null,
            fontWeight: selectedItem ? selectedItem.fontWeight : null,
            lineHeight: selectedItem ? selectedItem.lineHeight : null,
            linethrough: selectedItem ? selectedItem.linethrough : null,
            textAlign: selectedItem ? selectedItem.textAlign : null,
            underline: selectedItem ? selectedItem.underline : null,
        };
        const styleValues = {
            fill: selectedItem ? selectedItem.fill : null,
            opacity: selectedItem ? selectedItem.opacity : null,
            stroke: selectedItem ? selectedItem.stroke : null,
            strokeWidth: selectedItem ? selectedItem.strokeWidth : null,
        };

        const mapHandler = () => {
            const change = {
                width: 900,
            };
            const allData = { workarea: { ...map.workarea, width: 900 } };
            onChange(selectedItem, change, allData);
            console.log(selectedItem, change, allData, 'Makeshift');
        };

        const fileHandler = ({ currentTarget: { files } }) => {
            const change = {
                file: files[0],
            };
            const allData = {
                workarea: {
                    imageLoadType: 'file',
                    file: null,
                },
            };
            onChange(selectedItem, change, allData);
            console.log(selectedItem, change, allData, 'Makeshift', files[0]);
        };

        const urlHandler = () => {
            const change = {
                src: 'https://images.freeimages.com/images/large-previews/478/jack-o-lanterns-1326113.jpg',
            };
            const allData = {
                workarea: {
                    imageLoadType: 'src',
                    src: '',
                    url: '',
                },
            };
            onChange(selectedItem, change, allData);
            console.log(selectedItem, change, allData, 'Makeshift');
        };

        const textHandler = () => {
            const change = {
                opacity: 0.2,
            };
            onChange(selectedItem, change, styleValues);
        };

        return (
            <>
                <button onClick={mapHandler}>Change Map</button>
                <button onClick={urlHandler}>Upload URL</button>
                <input onChange={fileHandler} type="file" name="fileToUpload" id="fileToUpload" />

                <button onClick={textHandler}>Change Text</button>
            </>
        );
    }
}

export default ImageMapConfigurations;
