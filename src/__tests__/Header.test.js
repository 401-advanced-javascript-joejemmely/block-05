import React from 'react';
import Header from '../components/Header';

describe('Header', () => {
  it('renders', () => {
    const mountedSimple = shallow(<Header />);
    expect(mountedSimple.find('header')).toBeTruthy();
  });
});
