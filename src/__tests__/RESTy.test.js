import React from 'react';
import RESTy from '../components/RESTy';

describe('RESTy', () => {
  it('renders', () => {
    const mountedSimple = shallow(<RESTy />);
    expect(mountedSimple.find('main')).toBeTruthy();
  });

  test('state change', () => {
    const mountedForm = mount(<RESTy />);
    const input = mountedForm.find('input').at(0);
    input.simulate('change', { target: { value: 'https://swapi.co/api/people' } });
    expect(mountedForm.state('url')).toEqual('https://swapi.co/api/people');
  });
});
