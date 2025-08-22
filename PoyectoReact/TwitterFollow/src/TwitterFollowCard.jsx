import { useState } from 'react';

export function TwitterFollowCard({children,userName,name}) {
    const [isFollowing, setIsFollowingState] = useState(false);
    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const isFollowingClass = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button';
    const handleClick = () => {
        setIsFollowingState(!isFollowing);
    };
    return(
        <article className="tw-followCard">
        <header className="tw-followCard-header">
                <img 
                className="tw-followCard-avatar"
                alt={`Avatar de ${name}`}
                src={`https://unavatar.io/${userName}`} 
                />
            <div className="tw-followCard-info">
                <strong>{children}</strong>
                <span className = "tw-followCard-infoUserName">@{userName}</span>
            </div>
        </header>

            <aside>
                <button className={isFollowingClass} onClick={handleClick}>
                    <span className="tw-followCard-stopFollowing">Dejar de seguir</span>
                    <span className = "tw-followCard-text">{text}</span>
                </button>
            </aside> 
        </article>
    )
}