import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { CommonButton } from '../common';

class ImageMapHeaderToolbar extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
    }

    render() {
        const { canvasRef } = this.props;
        const isCropping = canvasRef ? canvasRef.interactionMode === 'crop' : false;
        return (
            <CommonButton
                className="rde-action-btn"
                shape="circle"
                disabled={isCropping}
                onClick={() => canvasRef.handlers.remove()}
                icon="trash"
                tooltipTitle={i18n.t('action.delete')}
            />
        );
    }
}

export default ImageMapHeaderToolbar;
