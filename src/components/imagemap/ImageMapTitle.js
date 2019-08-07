import React, { Component } from 'react';

class ImageMapTitle extends Component {
    render() {
        const { action, children } = this.props;
        return children || (
            <>
                {action}
            </>
        );
    }
}

export default ImageMapTitle;
