import { render, screen } from '@testing-library/react';
import DataTable from './DataTable/DataTable';
import App from './App'


const mockResponse = [{
    id: 1,
    location: 'https://image.com',
    purchaseDate: '2020-12-29T00:00:00.0000Z',
    category: 'Foo',
    description: 'Here is a description',
    price: 2345,
    name: 'Sample item'
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
    test('loads purchase history', async () => {
      
      const {container} = render(<App />);
      const item = await screen.findByText('Sample item')
      expect(container).not.toBeEmptyDOMElement();
      expect(item).toBeInTheDocument()
      
    });
});


