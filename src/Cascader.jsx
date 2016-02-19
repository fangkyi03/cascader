import React from 'react';
import Trigger from 'rc-trigger';
import Menus from './Menus';

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};

class Cascader extends React.Component {
  constructor(props) {
    super();
    this.state = {
      popupVisible: props.popupVisible,
    };
    [
      'handleChange',
      'handlePopupVisibleChange',
      'setPopupVisible',
      'getPopupDOMNode',
    ].forEach(method => this[method] = this[method].bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if ('popupVisible' in nextProps) {
      this.setState({
        popupVisible: nextProps.popupVisible,
      });
    }
  }
  getPopupDOMNode() {
    return this.refs.trigger.getPopupDomNode();
  }
  setPopupVisible(popupVisible) {
    if (!('popupVisible' in this.props)) {
      this.setState({ popupVisible });
    }
    this.props.onPopupVisibleChange(popupVisible);
  }
  handleChange(options, setProps) {
    this.props.onChange(
      options.map(o => o.value),
      options
    );
    this.setPopupVisible(setProps.visible);
  }
  handlePopupVisibleChange(popupVisible) {
    this.setPopupVisible(popupVisible);
  }
  render() {
    const props = this.props;
    const { prefixCls, transitionName, popupClassName, popupPlacement } = props;
    // Did not show popup when there is no options
    let menus = <div />;
    let emptyMenuClassName = '';
    if (props.options && props.options.length > 0) {
      menus = (
        <Menus
          {...props}
          onChange={this.handleChange}
          onSelect={this.props.onSelect}
          visible={this.state.popupVisible} />
      );
    } else {
      emptyMenuClassName = ` ${prefixCls}-menus-empty`;
    }
    return (
      <Trigger ref="trigger"
        popupPlacement={popupPlacement}
        builtinPlacements={BUILT_IN_PLACEMENTS}
        popupTransitionName={transitionName}
        action={props.disabled ? [] : ['click']}
        popupVisible={props.disabled ? false : this.state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        prefixCls={`${prefixCls}-menus`}
        popupClassName={popupClassName + emptyMenuClassName}
        popup={menus}>
        {props.children}
      </Trigger>
    );
  }
}

Cascader.defaultProps = {
  options: [],
  onChange() {},
  onSelect() {},
  onPopupVisibleChange() {},
  disabled: false,
  transitionName: '',
  prefixCls: 'rc-cascader',
  popupClassName: '',
  popupPlacement: 'bottomLeft',
};

Cascader.propTypes = {
  options: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onPopupVisibleChange: React.PropTypes.func,
  popupVisible: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  transitionName: React.PropTypes.string,
  popupClassName: React.PropTypes.string,
  popupPlacement: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
};

export default Cascader;