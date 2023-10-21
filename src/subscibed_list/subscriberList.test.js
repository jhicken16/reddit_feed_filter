import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import SubscriberList from './SubscribedList.js'
import FeedFilter from '../utilities/feedFilter/FeedFilter.js';



describe('All button and titles of buttons render to screen.', () => {

    const initialState = {
        subscribed: {
            subReddits: ['rd/funny', 'rd/LITrpg', 'rd/gamming']
        }
    }
    const mockStore = configureStore([])
    const mockSubscribeStore = mockStore(initialState)


    it('Checks to see if all titles are render on screen fro mock store 1 out of 3.', () => {
        render(
            <Provider store={mockSubscribeStore}>
                <SubscriberList>
                    <FeedFilter/> 
                </SubscriberList>
            </Provider>
        )

        const funnyTitle = screen.getByText('rd/funny')
        expect(funnyTitle).toBeTruthy()
    })

    it('Checks to see if all titles are render on screen fro mock store 2 out of 3.', () => {
        render(
            <Provider store={mockSubscribeStore}>
                <SubscriberList>
                    <FeedFilter/> 
                </SubscriberList>
            </Provider>
        )

        const litTitle = screen.getByText('rd/LITrpg')
        expect(litTitle).toBeTruthy()
    })
    
    it('Checks to see if all titles are render on screen fro mock store 3 out of 3.', () => {
        render(
            <Provider store={mockSubscribeStore}>
                <SubscriberList>
                    <FeedFilter/> 
                </SubscriberList>
            </Provider>
        )

        const gamingTitle = screen.getByText('rd/gamming')
        expect(gamingTitle).toBeTruthy()
    })


    it('Same amount of button as array length in store', () => {
        render(
            <Provider store={mockSubscribeStore}>
                <SubscriberList>
                    <FeedFilter/> 
                </SubscriberList>
            </Provider>
        )

        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toEqual(initialState.subscribed.subReddits.length)
        
    })
})