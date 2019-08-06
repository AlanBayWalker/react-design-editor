import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Collapse, List } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../common/Scrollbar';
import { FlexBox } from '../../flex';

const { Panel } = Collapse;

class NodeProperties extends Component {
    static propTypes = {
        canvasRef: PropTypes.any,
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
        const { canvasRef, selectedItem, form } = this.props;
        const showArrow = false;
        return (
            <Scrollbar>
                <Form layout="horizontal">
                    <Collapse bordered={false}>
                        {
                            Object.keys(PropertyDefinition[selectedItem.type]).map(key => (
                                <Panel key={key} header={PropertyDefinition[selectedItem.type][key].title} showArrow={showArrow}>
                                    {PropertyDefinition[selectedItem.type][key].component.render(canvasRef, form, selectedItem)}
                                </Panel>
                            ))
                        }
                    </Collapse>
                </Form>
            </Scrollbar>
        );
    }
}

export default Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        const { onChange, selectedItem } = props;
        onChange(selectedItem, changedValues, allValues);
    },
})(NodeProperties);
