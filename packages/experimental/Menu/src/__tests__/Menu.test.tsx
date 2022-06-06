import * as React from 'react';
import { AccessibilityActionName } from 'react-native';
import * as renderer from 'react-test-renderer';
import { Menu } from '../Menu/Menu';
import { checkReRender } from '@fluentui-react-native/test-tools';
import MenuTrigger from '../MenuTrigger/MenuTrigger';
import { ButtonV1 as Button } from '@fluentui-react-native/button';
import MenuPopover from '../MenuPopover/MenuPopover';
import { MenuList } from '../MenuList/MenuList';
import { MenuItem } from '../MenuItem/MenuItem';
import { MenuItemCheckbox } from '../MenuItemCheckbox/MenuItemCheckbox';
import { MenuDivider } from '../MenuDivider/MenuDivider';
import { MenuItemRadio } from '../MenuItemRadio/MenuItemRadio';

describe('Checkbox component tests', () => {
  it('Menu default', () => {
    const tree = renderer
      .create(
        <Menu>
          <MenuTrigger>
            <Button>Default</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem content="Option 1" />
            </MenuList>
          </MenuPopover>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Menu open', () => {
    const tree = renderer
      .create(
        <Menu open>
          <MenuTrigger>
            <Button>Open</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem content="Option 1" />
            </MenuList>
          </MenuPopover>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Menu defaultOpen', () => {
    const tree = renderer
      .create(
        <Menu defaultOpen>
          <MenuTrigger>
            <Button>Open</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem content="Option 1" />
              <MenuItem disabled content="Option 2" />
            </MenuList>
          </MenuPopover>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Menu open checkbox and divider', () => {
    const tree = renderer
      .create(
        <Menu open>
          <MenuTrigger>
            <Button>Open</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemCheckbox content="Option 1" name="Option 1" />
              <MenuDivider />
              <MenuItemCheckbox disabled content="Option 2" name="Option 2" />
            </MenuList>
          </MenuPopover>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Menu open radio', () => {
    const tree = renderer
      .create(
        <Menu open>
          <MenuTrigger>
            <Button>Open</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemRadio content="Option 1" name="Option 1" />
              <MenuItemRadio content="Option 2" name="Option 2" />
            </MenuList>
          </MenuPopover>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Menu open checkbox defaultChecked', () => {
    const tree = renderer
      .create(
        <Menu open defaultChecked={{ 'Option 1': true }}>
          <MenuTrigger>
            <Button>Open</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemCheckbox content="Option 1" name="Option 1" />
              <MenuDivider />
              <MenuItemCheckbox content="Option 2" name="Option 2" />
            </MenuList>
          </MenuPopover>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Menu open checkbox checked', () => {
    const tree = renderer
      .create(
        <Menu open checked={{ 'Option 1': true }}>
          <MenuTrigger>
            <Button>Open</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItemCheckbox content="Option 1" name="Option 1" />
              <MenuDivider />
              <MenuItemCheckbox content="Option 2" name="Option 2" />
            </MenuList>
          </MenuPopover>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Menu submenu', () => {
    const tree = renderer
      .create(
        <Menu open>
          <MenuTrigger>
            <Button>Default</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem content="Option 1" />
              <Menu>
                <MenuTrigger>
                  <MenuItem content="Option 2" />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem content="Option 1" />
                  </MenuList>
                </MenuPopover>
              </Menu>
            </MenuList>
          </MenuPopover>
        </Menu>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Menu rerender tests', () => {
  it('Menu re-renders correctly', () => {
    checkReRender(
      () => (
        <Menu open>
          <MenuTrigger>
            <Button>Rerender twice</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem content="Option 1" />
            </MenuList>
          </MenuPopover>
        </Menu>
      ),
      3,
    );
  });

  it('Menu re-renders correctly with style', () => {
    const style = { backgroundColor: 'black' };
    checkReRender(
      () => (
        <Menu>
          <MenuTrigger>
            <Button style={style}>Rerender twice</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem content="Option 1" />
            </MenuList>
          </MenuPopover>
        </Menu>
      ),
      3,
    );
  });

  it('Menu re-renders correctly with accessibilityAction', () => {
    const action = [{ name: 'Expand' as AccessibilityActionName }];
    checkReRender(
      () => (
        <Menu>
          <MenuTrigger>
            <Button>Rerender twice</Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem accessibilityActions={action} content="Option 1" />
            </MenuList>
          </MenuPopover>
        </Menu>
      ),
      3,
    );
  });
});