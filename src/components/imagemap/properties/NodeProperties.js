import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NodeProperties extends Component {
    static propTypes = {
        selectedItem: PropTypes.object,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedItem && nextProps.selectedItem) {
            if (this.props.selectedItem.id !== nextProps.selectedItem.id) {
                nextProps.form.resetFields();
            }
        }
    }

    render() {
        const { selectedItem } = this.props;
        const generalValues = {
            height: selectedItem.height,
            left: selectedItem.left,
            lock: selectedItem.lock,
            name: selectedItem.name,
            top: selectedItem.top,
            visible: selectedItem.visible,
            width: selectedItem.width,
        };
        const textValues = {
            charSpacing: selectedItem.charSpacing,
            fontFamily: selectedItem.fontFamily,
            fontSize: selectedItem.fontSize,
            fontStyle: selectedItem.fontStyle,
            fontWeight: selectedItem.fontWeight,
            lineHeight: selectedItem.lineHeight,
            linethrough: selectedItem.linethrough,
            textAlign: selectedItem.textAlign,
            underline: selectedItem.underline,
        };
        const styleValues = {
            fill: selectedItem.fill,
            opacity: selectedItem.opacity,
            stroke: selectedItem.stroke,
            strokeWidth: selectedItem.strokeWidth,
        };

        return (
            <div onClick={() => this.props.onChange(selectedItem, {
                opacity: 0.2,
            }, styleValues)}
            >
Click here

            </div>
        );
    }
}

export default NodeProperties;
