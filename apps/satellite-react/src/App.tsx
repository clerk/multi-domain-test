import {useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {
    ClerkLoaded,
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
    UserButton
} from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
const domain = import.meta.env.VITE_CLERK_DOMAIN as string;
const isSatellite = (import.meta.env.VITE_CLERK_IS_SATELLITE as string) === 'true'

function App() {
    const [count, setCount] = useState(0)

    return (
        // Wrap your entire app with ClerkProvider
        // Don't forget to pass the publishableKey prop
        <>
            <ClerkProvider publishableKey={clerkPubKey} isSatellite={isSatellite} domain={domain}>
                <ClerkLoaded>
                    <SignedIn>
                        <div style={{
                            gap: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                            <SignOutButton/>
                            <UserButton/>
                        </div>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton mode={'modal'}/>
                    </SignedOut>
                    <div className="App">
                        <div>
                            <a href="https://vitejs.dev" target="_blank">
                                <img src="/vite.svg" className="logo" alt="Vite logo"/>
                            </a>
                            <a href="https://reactjs.org" target="_blank">
                                <img src={reactLogo} className="logo react" alt="React logo"/>
                            </a>
                        </div>
                        <h1>Vite + React</h1>
                        <div className="card">
                            <button onClick={() => setCount((count) => count + 1)}>
                                count is {count}
                            </button>
                            <p>
                                Edit <code>src/App.tsx</code> and save to test HMR
                            </p>
                        </div>
                        <p className="read-the-docs">
                            Click on the Vite and React logos to learn more
                        </p>
                    </div>
                </ClerkLoaded>
            </ClerkProvider>
        </>
    )
}

export default App
