import React from 'react';
import RESTy from '../components/RESTy';

describe('RESTy', () => {
  it('renders', () => {
    const mountedSimple = shallow(<RESTy />);
    expect(mountedSimple.find('main')).toBeTruthy();
  });
  it('state change', () => {});
});
