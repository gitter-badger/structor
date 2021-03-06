import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel, Button, Nav, CollapsibleNav,
    Navbar, DropdownButton, MenuItem, NavItem } from 'react-bootstrap';

import Combobox from 'react-widgets/lib/Combobox';

class SearchComponentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
        this.selected = false;
    }


    componentDidMount() {
        var $element = $(ReactDOM.findDOMNode(this.refs.selectElement)).find('input');
        $element.on('keydown', this.handleOnKeyDown);
        $element.focus();
    }

    handleClose(e) {
        e.stopPropagation();
        e.preventDefault();
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    handleSelect(value) {
        if (this.props.onChangeValue) {
            this.props.onChangeValue(value);
            this.selected = true;
        }
    }

    handleChange(value) {
        if(this.selected){
            this.setState({ value: ''});
            this.selected = false;
        } else {
            this.setState({ value: value });
        }
    }

    handleOnKeyDown(e) {
        if (e.keyCode == 27) {
            this.handleClose(e);
        }
    }

    render() {
        var components = [];

        _.forOwn(this.props.componentsTree, (group, groupName) => {
            if (_.isObject(group)) {
                _.forOwn(group, (componentTypeValue, componentId) => {
                    components.push(componentId);
                });
            }
        });

        let methodLabel = '';
        switch(this.props.method){
            case 'addBefore':
                methodLabel = 'Add before selected';
                break;
            case 'insertFirst':
                methodLabel = 'Insert as first into selected';
                break;
            case 'replace':
                methodLabel = 'Replace selected with';
                break;
            case 'wrap':
                methodLabel = 'Wrap selected with';
                break;
            case 'insertLast':
                methodLabel = 'Insert as last into selected';
                break;
            case 'addAfter':
                methodLabel = 'Add after selected';
                break;
            default:
                break;
        }

        return (
            <div {...this.props} >
                <div style={{display: 'table', width: '100%'}}>
                    <div style={{display: 'table-row'}}>
                        <div style={{display: 'table-cell', textAlign: 'left', verticalAlign: 'middle'}}>
                            <a className="btn btn-xs btn-default btn-warning"
                               onClick={this.handleClose}>
                                <span className="fa fa-times fa-fw"></span>
                                <span>{methodLabel}</span>
                            </a>
                        </div>
                        <div style={{display: 'table-cell', width: '90%', verticalAlign: 'middle'}}>
                            <Combobox
                                ref="selectElement"
                                data={components}
                                caseSensitive={false}
                                minLength={1}
                                value={this.state.value}
                                onChange={this.handleChange}
                                filter={'startsWith'}
                                onSelect={this.handleSelect}/>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}


function mapStateToProps(state) {
    const { deskPage } = state;
    return {
        componentsTree: deskPage.componentsTree
    };
}

export default connect(
    mapStateToProps
)(SearchComponentName);

