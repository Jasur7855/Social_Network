import { useEffect, useState, useCallback } from "react";
import { History } from "../../components/History/History";
import { Post } from "../../components/Post/Post";
import { Container } from "../../components/UI/Container/Container.style";
import { Header } from "../../components/UI/Header/Header";
import { Navbar } from "../../components/UI/Navbar/Navbar";
import { WhatsNew } from "../../components/WhatsNew/WhatsNew";
import { useLazyGetPostListQuery } from "../../store/API/postApi";
import "./MainPage.scss";
import { StyledMainPage } from "./MainPage.style";
import { FullscreenLoader } from "../../components/UI/FullscreenLoader/FullscreenLoader";
import { EditPostForm } from "../PostPage/EditPostForm";
import type { PostItem } from "../../store/API/postApi";
import { Heading } from "../../components/Typography/Heading";
import { UserElem } from "../../components/UserElem/UserElem";

const userElemData = [
  {
    mainText: "N E W",
    imgLink: "./img/profile/profile-img-1.jpeg",
    secondaryText: "Развитие",
    badgeNumber: 3,
    altText: "User",
  },
  {
    mainText: "Aesthetics",
    imgLink: "./img/profile/profile-img-2.jpeg",
    secondaryText: "Стиль",
    badgeNumber: 3,
    altText: "User",
  },
  {
    mainText: "дом твоей эстетики",
    imgLink: "./img/profile/profile-img-3.jpeg",
    secondaryText: "Творчество",
    badgeNumber: 3,
    altText: "User",
  },
  {
    mainText: "wailet",
    imgLink: "./img/profile/profile-img-4.jpeg",
    secondaryText: "Искусство",
    badgeNumber: 3,
    altText: "User",
  },
  {
    mainText: "A W E S O M E",
    imgLink: "./img/profile/profile-img-5.jpeg",
    secondaryText: "Стиль",
    badgeNumber: 3,
    altText: "User",
  },
  {
    mainText: "minimalism",
    imgLink: "./img/profile/profile-img-6.jpeg",
    secondaryText: "Фотография",
    badgeNumber: 3,
    altText: "User",
  },
  {
    mainText: "Словарный запас",
    imgLink: "./img/profile/profile-img-7.jpeg",
    secondaryText: "Литература",
    badgeNumber: 3,
    altText: "User",
  },
  {
    mainText: "Look",
    imgLink: "./img/profile/profile-img-8.jpeg",
    secondaryText: "Мода",
    badgeNumber: 3,
    altText: "User",
  },
];

export const MainPage = () => {
  const [fetchTrigger, { data, isLoading, isError }] =
    useLazyGetPostListQuery();
  const [selectedPost, setSelectedPost] = useState<PostItem | null>();
  const [openEditPost, setOpenEditPost] = useState<boolean>(false);

  useEffect(() => {
    fetchTrigger(null);
  }, [fetchTrigger, data]);

  const onEditModalClose = useCallback(() => {
    setSelectedPost(null);
    setOpenEditPost(false);
  }, []);

  const handleEditPostClick = useCallback((post: PostItem) => {
    setSelectedPost(post);
    setOpenEditPost(true);
  }, []);

  const handleEditPostSuccess = useCallback(() => {
    fetchTrigger(null);
    onEditModalClose();
  }, []);

  return (
    <Container>
      <Header />
      {isLoading && <FullscreenLoader />}
      <StyledMainPage>
        <aside className="LeftSide">
          <Navbar />
          <div className="List">
            <div className="List__title">
              <Heading headingText={"Подписки"} />
              <span className="count">123</span>
            </div>
            {userElemData &&
              userElemData.map((elem) => (
                <UserElem
                  mainText={elem.mainText}
                  imgLink={elem.imgLink}
                  secondaryText={elem.secondaryText}
                  badgeNumber={elem.badgeNumber}
                  altText={elem.altText}
                />
              ))}
          </div>
        </aside>
        <main className="Main">
          <WhatsNew onNewPostAdded={() => fetchTrigger(null)} />
          <History />
          {isError && <h1>Ошибка :</h1>}
          {!!data?.message.length &&
            [...data.message].reverse().map((post) => (
              <Post
                key={post.id}
                post={post}
                onPostDelete={() => fetchTrigger(null)}
                onPostEditClick={() => handleEditPostClick(post)}
                onPostUpdated={() => {
                  fetchTrigger(null);
                }}
              />
            ))}
        </main>
        {selectedPost && (
          <EditPostForm
            isOpen={openEditPost}
            post={selectedPost}
            onCloseModal={onEditModalClose}
            onEditPostSuccess={handleEditPostSuccess}
          />
        )}
        <aside className="RightSide">
          <div className="List">
            <div className="List__title">
              <h2>Близкие друзья</h2>
              <span className="count">123</span>
            </div>
            <div className="UserElem">
              <img src="./img/users/aleksandr-maykov.jpeg" alt="User" />
              <div className="user__description">
                <p className="main__text">Александр Майков</p>
                <p className="secondary__text _online">Онлайн</p>
              </div>
              <span className="Badge">3</span>
            </div>
            <div className="UserElem">
              <img src="./img/users/aleksandr-maykov.jpeg" alt="User" />
              <div className="user__description">
                <p className="main__text">Александр Майков</p>
                <p className="secondary__text _online">Онлайн</p>
              </div>
              <span className="Badge">3</span>
            </div>
            <div className="UserElem">
              <img src="./img/users/aleksandr-maykov.jpeg" alt="User" />
              <div className="user__description">
                <p className="main__text">Александр Майков</p>
                <p className="secondary__text _online">Онлайн</p>
              </div>
              <span className="Badge">3</span>
            </div>
          </div>
          <div className="MusicBlock">
            <div className="MusicBlock__title">
              <h2>Вы недавно слушали</h2>
              <span>123</span>
            </div>
            <div className="MusicElem">
              <img src="./img/music/album-1.png" alt="Album" />
              <div className="music__description">
                <p className="main__text">Pieces</p>
                <p className="secondary__text">Andrew Belle</p>
              </div>
              <div className="plus-button _active"></div>
            </div>
            <div className="MusicElem">
              <img src="./img/music/album-2.png" alt="Album" />
              <div className="music__description">
                <p className="main__text">In the Wind</p>
                <p className="secondary__text">On-The-Go</p>
              </div>
              <div className="plus-button"></div>
            </div>
            <div className="MusicElem">
              <img src="./img/music/album-3.png" alt="Album" />
              <div className="music__description">
                <p className="main__text">On you own</p>
                <p className="secondary__text">Meltt</p>
              </div>
              <div className="plus-button _active"></div>
            </div>
            <div className="MusicElem">
              <img src="./img/music/album-4.png" alt="Album" />
              <div className="music__description">
                <p className="main__text">Infinity</p>
                <p className="secondary__text">James Young</p>
              </div>
              <div className="plus-button"></div>
            </div>
            <div className="MusicElem">
              <img src="./img/music/album-5.png" alt="Album" />
              <div className="music__description">
                <p className="main__text">Let me follow</p>
                <p className="secondary__text">Son Lux</p>
              </div>
              <div className="plus-button _active"></div>
            </div>
            <div className="MusicElem">
              <img src="./img/music/album-6.png" alt="Album" />
              <div className="music__description">
                <p className="main__text">Youth</p>
                <p className="secondary__text">Glass Animals</p>
              </div>
              <div className="plus-button"></div>
            </div>
          </div>
        </aside>
      </StyledMainPage>
    </Container>
  );
};
