import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification, message } from 'antd';
import uuid from 'uuid/v4';
import Icon from '../icon/Icon';

notification.config({
    top: 80,
    duration: 2,
});

class ImageMapItems extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
        descriptors: PropTypes.object,
    }

    state = {
        activeKey: [],
        collapse: false,
        textSearch: '',
        descriptors: {},
        filteredDescriptors: [],
        svgModalVisible: false,
    }

    componentDidMount() {
        const { canvasRef } = this.props;
        this.waitForCanvasRender(canvasRef);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.descriptors) !== JSON.stringify(nextProps.descriptors)) {
            const descriptors = Object.keys(nextProps.descriptors).reduce((prev, key) => prev.concat(nextProps.descriptors[key]), []);
            this.setState({
                descriptors,
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.state.descriptors) !== JSON.stringify(nextState.descriptors)) {
            return true;
        } if (JSON.stringify(this.state.filteredDescriptors) !== JSON.stringify(nextState.filteredDescriptors)) {
            return true;
        } if (this.state.textSearch !== nextState.textSearch) {
            return true;
        } if (JSON.stringify(this.state.activeKey) !== JSON.stringify(nextState.activeKey)) {
            return true;
        } if (this.state.collapse !== nextState.collapse) {
            return true;
        } if (this.state.svgModalVisible !== nextState.svgModalVisible) {
            return true;
        }
        return false;
    }

    componentWillUnmount() {
        const { canvasRef } = this.props;
        this.detachEventListener(canvasRef);
    }

    waitForCanvasRender = (canvas) => {
        setTimeout(() => {
            if (canvas) {
                this.attachEventListener(canvas);
                return;
            }
            const { canvasRef } = this.props;
            this.waitForCanvasRender(canvasRef);
        }, 5);
    };

    attachEventListener = (canvas) => {
        canvas.canvas.wrapperEl.addEventListener('dragenter', this.events.onDragEnter, false);
        canvas.canvas.wrapperEl.addEventListener('dragover', this.events.onDragOver, false);
        canvas.canvas.wrapperEl.addEventListener('dragleave', this.events.onDragLeave, false);
        canvas.canvas.wrapperEl.addEventListener('drop', this.events.onDrop, false);
    }

    detachEventListener = (canvas) => {
        canvas.canvas.wrapperEl.removeEventListener('dragenter', this.events.onDragEnter);
        canvas.canvas.wrapperEl.removeEventListener('dragover', this.events.onDragOver);
        canvas.canvas.wrapperEl.removeEventListener('dragleave', this.events.onDragLeave);
        canvas.canvas.wrapperEl.removeEventListener('drop', this.events.onDrop);
    }

    /* eslint-disable react/sort-comp, react/prop-types */
    handlers = {
        onAddItem: (item, centered) => {
            const { canvasRef } = this.props;
            if (canvasRef.workarea.layout === 'responsive') {
                if (!canvasRef.workarea.isElement) {
                    notification.warn({
                        message: 'Please your select background image',
                    });
                    return;
                }
            }
            if (canvasRef.interactionMode === 'polygon') {
                message.info('Already drawing');
                return;
            }
            const id = uuid();
            const option = Object.assign({}, item.option, { id });
            if (item.option.type === 'svg' && item.type === 'default') {
                this.handlers.onSVGModalVisible(item.option);
                return;
            }
            canvasRef.handlers.add(option, centered);
        },
        onSVGModalVisible: () => {
            this.setState((prevState) => {
                return {
                    svgModalVisible: !prevState.svgModalVisible,
                };
            });
        },
    }

    events = {
        onDragStart: (e, item) => {
            this.item = item;
            const { target } = e;
            target.classList.add('dragging');
        },
        onDragOver: (e) => {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'copy';
            return false;
        },
        onDragEnter: (e) => {
            const { target } = e;
            target.classList.add('over');
        },
        onDragLeave: (e) => {
            const { target } = e;
            target.classList.remove('over');
        },
        onDrop: (e) => {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            const { layerX, layerY } = e;
            const dt = e.dataTransfer;
            if (dt.types.length && dt.types[0] === 'Files') {
                const { files } = dt;
                Array.from(files).forEach((file) => {
                    file.uid = uuid();
                    const { type } = file;
                    if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
                        const item = {
                            option: {
                                type: 'image',
                                file,
                                left: layerX,
                                top: layerY,
                            },
                        };
                        this.handlers.onAddItem(item, false);
                    } else {
                        notification.warn({
                            message: 'Not supported file type',
                        });
                    }
                });
                return false;
            }
            const option = Object.assign({}, this.item.option, { left: layerX, top: layerY });
            const newItem = Object.assign({}, this.item, { option });
            this.handlers.onAddItem(newItem, false);
            return false;
        },
        onDragEnd: (e) => {
            this.item = null;
            e.target.classList.remove('dragging');
        },
    }

    render() {
        const item = {
            name: 'Not Text',
            description: '',
            type: 'text',
            icon: {
                prefix: 'fas',
                name: 'font',
            },
            option: {
                type: 'textbox',
                text: '',
                width: 60,
                height: 30,
                fontSize: 32,
                name: 'New text',
            },
        };
        const centered = true;

        return (
            <div
                draggable
                onClick={e => this.handlers.onAddItem(item, centered)}
                onDragStart={e => this.events.onDragStart(e, item)}
                onDragEnd={e => this.events.onDragEnd(e, item)}
                className="rde-editor-items-item"
            >
                <span className="rde-editor-items-item-icon">
                    <Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
                </span>
                <div className="rde-editor-items-item-text">
                    {item.name}
                </div>
            </div>
        );
    }
}

export default ImageMapItems;
