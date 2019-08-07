import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapProperties extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
    }

    render() {
        const { onChange, selectedItem, canvasRef } = this.props;
        const map = {
            workarea: {
                name: canvasRef ? canvasRef.workarea.name : null,
                layout: canvasRef ? canvasRef.workarea.layout : null,
                width: canvasRef ? canvasRef.workarea.width : null,
                height: canvasRef ? canvasRef.workarea.height : null,
            } };

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

        if (canvasRef) {
            return (
                <>
                    <div onClick={mapHandler}>Change Map</div>
                    <div onClick={urlHandler}>Upload URL</div>
                    <input onChange={fileHandler} type="file" name="fileToUpload" id="fileToUpload" />
                </>
            );
        }
        return null;
    }
}

export default MapProperties;
