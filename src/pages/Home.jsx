import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../store/slices/posts";
import { PostSkeleton } from "../components/Post/Skeleton";

export const Home = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.postsItems)
    const tags = useSelector(state => state.posts.tagsItems)
    const isLoading = useSelector(state => state.posts.isLoading)
    console.log('posts: ', posts)

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Tabs
                style={{marginBottom: 15}}
                value={0}
                aria-label="basic tabs example"
            >
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {isLoading ? <PostSkeleton/> : posts.map((post) => (
                        <Post

                            key={post.index}
                            id={post._id}
                            title={post.title}
                            imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                            user={{
                                avatarUrl:
                                    "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                                fullName: post.user.fullName,
                            }}
                            createdAt={post.createdAt}
                            viewsCount={post.viewsCount}
                            commentsCount={111}
                            tags={post.tags}
                            isEditable
                        />
                    ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock
                        items={tags}
                        isLoading={false}
                    />
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: "Вася Пупкин",
                                    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                                },
                                text: "Это тестовый комментарий",
                            },
                            {
                                user: {
                                    fullName: "Иван Иванов",
                                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                                },
                                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
