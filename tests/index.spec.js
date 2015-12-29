const expect = require('expect.js');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Simulate = TestUtils.Simulate;
const Cascader = require('../');
const addressOptions = require('./demoOptions');

describe('Cascader', () => {
  let instance;
  let div;
  let selectedValue;
  const onChange = function onChange(value) {
    selectedValue = value;
  };

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
    selectedValue = null;
  });

  it('should toggle select panel when click it', (done) => {
    instance = ReactDOM.render(
      <Cascader options={addressOptions} onChange={onChange}>
        <input readOnly />
      </Cascader>
    , div);
    expect(instance.state.popupVisible).not.to.be.ok();
    Simulate.click(ReactDOM.findDOMNode(instance));
    expect(instance.state.popupVisible).to.be.ok();
    Simulate.click(ReactDOM.findDOMNode(instance));
    expect(instance.state.popupVisible).not.to.be.ok();
    done();
  });

  it('should call onChange when finish select', (done) => {
    instance = ReactDOM.render(
      <Cascader options={addressOptions} onChange={onChange}>
        <input readOnly />
      </Cascader>
    , div);
    Simulate.click(ReactDOM.findDOMNode(instance));
    let menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(1);
    const menu1Items = menus[0].querySelectorAll('.rc-cascader-menu-item');
    expect(menu1Items.length).to.be(3);
    expect(selectedValue).not.to.be.ok();

    Simulate.click(menu1Items[0]);
    expect(menu1Items[0].className).to.contain('rc-cascader-menu-item-active');
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(2);
    const menu2Items = menus[1].querySelectorAll('.rc-cascader-menu-item');
    expect(menu2Items.length).to.be(2);
    expect(instance.state.popupVisible).to.be.ok();
    expect(selectedValue).not.to.be.ok();

    Simulate.click(menu2Items[0]);
    expect(menu2Items[0].className).to.contain('rc-cascader-menu-item-active');
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(3);
    const menu3Items = menus[2].querySelectorAll('.rc-cascader-menu-item');
    expect(menu3Items.length).to.be(1);
    expect(instance.state.popupVisible).to.be.ok();
    expect(selectedValue).not.to.be.ok();

    Simulate.click(menu3Items[0]);
    expect(menu3Items[0].className).to.contain('rc-cascader-menu-item-active');
    expect(selectedValue.join(',')).to.be('fj,fuzhou,mawei');
    expect(instance.state.popupVisible).not.to.be.ok();
    done();
  });

  it('should has defaultValue', (done) => {
    instance = ReactDOM.render(
      <Cascader options={addressOptions} defaultValue={['fj', 'fuzhou', 'mawei']} onChange={onChange}>
        <input readOnly />
      </Cascader>
    , div);
    Simulate.click(ReactDOM.findDOMNode(instance));
    const menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(3);
    const activeMenuItems = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu-item-active');
    expect(activeMenuItems.length).to.be(3);
    expect(activeMenuItems[0].innerHTML).to.be('福建');
    expect(activeMenuItems[1].innerHTML).to.be('福州');
    expect(activeMenuItems[2].innerHTML).to.be('马尾');
    done();
  });

  it('should support expand previous item when hover', (done) => {
    instance = ReactDOM.render(
      <Cascader expandTrigger="hover" options={addressOptions} onChange={onChange}>
        <input readOnly />
      </Cascader>
    , div);
    Simulate.click(ReactDOM.findDOMNode(instance));
    let menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(1);
    const menu1Items = menus[0].querySelectorAll('.rc-cascader-menu-item');
    expect(menu1Items.length).to.be(3);
    expect(selectedValue).not.to.be.ok();

    Simulate.mouseEnter(menu1Items[0]);
    expect(menu1Items[0].className).to.contain('rc-cascader-menu-item-active');
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(2);
    const menu2Items = menus[1].querySelectorAll('.rc-cascader-menu-item');
    expect(menu2Items.length).to.be(2);
    expect(instance.state.popupVisible).to.be.ok();
    expect(selectedValue).not.to.be.ok();

    Simulate.mouseEnter(menu2Items[0]);
    expect(menu2Items[0].className).to.contain('rc-cascader-menu-item-active');
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(3);
    const menu3Items = menus[2].querySelectorAll('.rc-cascader-menu-item');
    expect(menu3Items.length).to.be(1);
    expect(instance.state.popupVisible).to.be.ok();
    expect(selectedValue).not.to.be.ok();

    Simulate.click(menu3Items[0]);
    expect(menu3Items[0].className).to.contain('rc-cascader-menu-item-active');
    expect(selectedValue.join(',')).to.be('fj,fuzhou,mawei');
    expect(instance.state.popupVisible).not.to.be.ok();
    done();
  });

  it('should clear active selection when no finish select', (done) => {
    instance = ReactDOM.render(
      <Cascader options={addressOptions}>
        <input readOnly />
      </Cascader>
    , div);
    Simulate.click(ReactDOM.findDOMNode(instance));
    let menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    const menu1Items = menus[0].querySelectorAll('.rc-cascader-menu-item');
    Simulate.click(menu1Items[0]);
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(2);
    Simulate.click(ReactDOM.findDOMNode(instance));
    expect(instance.state.popupVisible).not.to.be.ok();
    Simulate.click(ReactDOM.findDOMNode(instance));
    expect(instance.state.popupVisible).to.be.ok();
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(1);
    done();
  });

  it('should set back to defaultValue when no finish select', (done) => {
    instance = ReactDOM.render(
      <Cascader options={addressOptions} defaultValue={['fj', 'fuzhou', 'mawei']}>
        <input readOnly />
      </Cascader>
    , div);
    Simulate.click(ReactDOM.findDOMNode(instance));
    let menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(3);
    const menu1Items = menus[0].querySelectorAll('.rc-cascader-menu-item');
    Simulate.click(menu1Items[0]);
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(2);
    Simulate.click(ReactDOM.findDOMNode(instance));
    expect(instance.state.popupVisible).not.to.be.ok();
    Simulate.click(ReactDOM.findDOMNode(instance));
    expect(instance.state.popupVisible).to.be.ok();
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(3);
    done();
  });

  it('should not change value when it is a controlled component', (done) => {
    instance = ReactDOM.render(
      <Cascader options={addressOptions} value={['fj']}>
        <input readOnly />
      </Cascader>
    , div);
    Simulate.click(ReactDOM.findDOMNode(instance));
    let menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(2);
    const menu1Items = menus[0].querySelectorAll('.rc-cascader-menu-item');

    Simulate.click(menu1Items[0]);
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(2);
    const menu2Items = menus[1].querySelectorAll('.rc-cascader-menu-item');

    Simulate.click(menu2Items[0]);
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(menus.length).to.be(3);
    const menu3Items = menus[2].querySelectorAll('.rc-cascader-menu-item');

    Simulate.click(menu3Items[0]);
    expect(instance.state.popupVisible).not.to.be.ok();
    Simulate.click(ReactDOM.findDOMNode(instance));
    menus = instance.getPopupDOMNode().querySelectorAll('.rc-cascader-menu');
    expect(instance.state.popupVisible).to.be.ok();
    expect(menus.length).to.be(2);
    done();
  });
});