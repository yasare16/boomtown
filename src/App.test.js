import { render, screen } from '@testing-library/react';
import App from './App'


const mockResponse = [{
    login: 'foo',
    id: 1,
    name: 'string',
    url: 'http://link.com',
    description: 'Here is a description',
    public_repos: 2345,
    type: 'Organization',
}]

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve(mockResponse)
  })
})

describe('App', () => {
    beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse)
    })
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
    test('loads github info', async () => {
      
      const {container} = render(<App />);
      const item = await screen.findByText('string')
      expect(container).not.toBeEmptyDOMElement();
      expect(item).toBeInTheDocument()
      
    });
});


