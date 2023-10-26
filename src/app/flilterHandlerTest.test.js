import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import user from '@testing-library/user-event'
import App from './App';

describe('Check that flilterHandler function is working correctly with mock store', () => {

    const initialState = {
        feed: {
            funny: [{name: 'r/funny', content: 'My training as a bin man was super easy could just pick it up as i went along'}],
            LITrpg: [{name: 'r/LITrpg', content: 'New book breads and beer, check it out now'}],
            gamming: [{name: 'r/gamming', content: 'battle bit is a big hit'}]
        },
        subscribed: {
            subReddits: ['r/funny', 'r/LITrpg', 'r/gamming']
        }
    }

    const mockStore = configureStore([])
    const mockOfBothSlices = mockStore(initialState)

    it('clicks button and check the related elements in the feed disappear, and then re0appear when click again', async () => {

        render(
            <Provider store={mockOfBothSlices}>
                <App/>
            </Provider>
        )

        const funnyButton = screen.getByLabelText('r/funny')
        await user.click(funnyButton)
        
        expect(screen.queryByText('My training as a bin man was super easy could just pick it up as i went along')).not.toBeTruthy()
    
        await user.click(funnyButton)
        expect(screen.getByText('My training as a bin man was super easy could just pick it up as i went along')).toBeTruthy()
    })
})