import { render, screen } from '@testing-library/react';
import Feed from './Feed';
import Post from '../utilities/post.js/Post';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';



//have multiple tests in describe block
describe('Checks that all data from store appears on page', () => {


    
    //make mock store
    const initialState = {
        feed: {
            funny: [{name: 'r/funny', content: 'My training as a bin man was super easy could just pick it up as i went along'}],
            LITrpg: [{name: 'r/LITrpg', content: 'New book breads and beer, check it out now'}],
            gamming: [{name: 'r/gamming', content: 'battle bit is a big hit'}]
        }
        
    }
    const middleWare = []
    const mockStore = configureStore(middleWare)
    const mockFeedStore = mockStore(initialState)
         
    it('renders 1 out of 3 posts to screen', () => {

        render(
            <Provider store={ mockFeedStore }>
                <Feed>
                    <Post/>
                </Feed>
            </Provider>    
        );
        const funnyTitle = screen.getByText('r/funny')
        const funnyPost = screen.getByText('My training as a bin man was super easy could just pick it up as i went along')

       

        expect(funnyTitle).toBeTruthy()
        expect(funnyPost).toBeTruthy()
  
       
    })
    it('renders 2 out of 3 posts to screen', () => { 
        render(
            <Provider store={ mockFeedStore }>
                <Feed>
                    <Post/>
                </Feed>
            </Provider>    
        );

            const gameTitle = screen.getByText('r/gamming')
            const gamePost = screen.getByText('battle bit is a big hit')
            
            expect(gameTitle).toBeTruthy()
            expect(gamePost).toBeTruthy()
    })

    it('renders 3 out of 3 posts to screen', () => { 
        render(
            <Provider store={ mockFeedStore }>
                <Feed>
                    <Post/>
                </Feed>
            </Provider>    
        );
        const litTitle = screen.getByText('r/LITrpg')
        const litPost = screen.getByText('New book breads and beer, check it out now')

        expect(litTitle).toBeTruthy()
        expect(litPost).toBeTruthy() 
    })
       
    
});
