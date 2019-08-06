import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import NodeProperties from './properties/NodeProperties';
import MapProperties from './properties/MapProperties';
import Icon from '../icon/Icon';

class ImageMapConfigurations extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
        selectedItem: PropTypes.object,
        onChange: PropTypes.func,
    }

    state = {
        activeKey: 'map',
    }

    handlers = {
        onChangeTab: (activeKey) => {
            this.setState({
                activeKey,
            });
        },
    }

    render() {
        const {
            onChange,
            selectedItem,
            canvasRef,
        } = this.props;
        const { activeKey } = this.state;
        const { onChangeTab } = this.handlers;

        return (
            <div className="rde-editor-configurations">
                <Tabs
                    tabPosition="right"
                    style={{ height: '100%' }}
                    activeKey={activeKey}
                    onChange={onChangeTab}
                    tabBarStyle={{ marginTop: 60 }}
                >
                    <Tabs.TabPane tab={<Icon name="cog" />} key="map">
                        <MapProperties onChange={onChange} canvasRef={canvasRef} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<Icon name="cogs" />} key="node">
                        <NodeProperties onChange={onChange} selectedItem={selectedItem} canvasRef={canvasRef} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ImageMapConfigurations;
