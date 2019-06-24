import React from 'react';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders', () => {
    const mountedSimple = shallow(<Footer />);
    expect(mountedSimple.find('footer')).toBeTruthy();
  });
});
