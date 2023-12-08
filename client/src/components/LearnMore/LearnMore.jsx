import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const LearnMore = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <div className="learn-more-container">
            <div className="overview-container">
                <h2>Welcome to Your Digital Household Manager!</h2>
                <p className="overview-paragraph">
                    Behold a digital creation, forged in the fires of my React education—a defense of newfound knowledge. This
                    project, a React masterpiece, invites you to explore digital realms of login, households, and lists.
                </p>
                <p className="overview-paragraph">
                    Crafted with precision, it empowers users to shape their digital abodes, managing tasks and quests with ease.
                    As you navigate, remember each click echoes the React mastery honed in the boot camp.
                </p>
                <p className="overview-paragraph">
                    Embark on this journey, where code meets conquest. Explore, learn, and witness the brilliance of React in
                    action.
                </p>
                <p className="overview-paragraph">
                    Yours in code and conquest,{' '}
                    <a href="https://www.linkedin.com/in/deyan-slavov-14648a207/" target="_blank" className="learn-more-links">
                        Dido
                    </a>
                    !
                </p>
            </div>

            {!user ? (
                <section className="learn-more-section">
                    <h3 className="border-bottom learn-more-headings">User Registration and Login</h3>
                    <p>
                        To get started,{' '}
                        <NavLink to="/profile/auth" className="learn-more-links">
                            create an account or log in
                        </NavLink>{' '}
                        to manage your digital households and lists efficiently.
                    </p>
                </section>
            ) : (
                <section className="learn-more-section">
                    <h3 className="border-bottom learn-more-headings">Creating a Digital Household</h3>
                    <p>
                        Easily{' '}
                        <NavLink to="/households/create" className="learn-more-links">
                            create
                        </NavLink>{' '}
                        and organize your digital households to categorize and manage your various lists.
                    </p>
                </section>
            )}

            <section className="learn-more-section">
                <h3 className="border-bottom learn-more-headings">Managing Digital Households</h3>
                <p>Learn how to edit or delete your digital households, and get tips on efficient organization.</p>
            </section>

            <section className="learn-more-section">
                <h3 className="border-bottom learn-more-headings">Information</h3>
                <p>
                    For more detailed information please refer to the{' '}
                    <a href="https://github.com/didoslavov/rButler" target="_blank" className="learn-more-links">
                        github page
                    </a>{' '}
                    of the project.
                </p>
            </section>
        </div>
    );
};

export default LearnMore;
