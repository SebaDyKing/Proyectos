import './index.css';
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';
export function App() {
  return (
    <section className="App"> 
        <TwitterFollowCard userName="midudev"  isFollowing>
          Miguel Angel Duran
        </TwitterFollowCard>

        <TwitterFollowCard userName="elonmusk" isFollowing>
          Elonmusk
        </TwitterFollowCard>

        <TwitterFollowCard userName="pablomonteserin" isFollowing={false}>
          Pablo Monteserin
        </TwitterFollowCard>
        
    </section>

  );
}