import React, { useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  RefreshControl,
  Alert,
  Text,
} from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { User, getAuth } from "firebase/auth";
import Post from "../../models/Post";
import PostItem from "../components/PostItem";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { propsStack } from "../../routes/types";
import Header from "../components/Header";
import ModalPost from "../components/ModalPost";
import { useTheme } from "../../context/ThemeContext";

function Feed() {
  const { navigate } = useNavigation<propsStack>();
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const { theme } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setRefreshing(true);
      const postsQuery = collection(db, "posts");
      const postsSnapshot = await getDocs(postsQuery);
      const postsData = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      const postsWithUserData = await Promise.all(
        postsData.map(async (post) => {
          const userDoc = await getDoc(doc(db, "users", post.idpub));
          const userData = userDoc.data() as {
            username: string;
            photo: string;
          };

          return {
            ...post,
            username: userData.username,
            userPhoto: userData.photo,
          };
        })
      );

      setPosts(postsWithUserData);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createNewPost = async (title: string, content: string) => {
    try {
      if (title.trim() !== "" && content.trim() !== "") {
        setLoading(true);

        const userDoc = await getDoc(doc(db, "users", user?.uid || ""));
        const userData = userDoc.data();

        if (!userData || Object.keys(userData).length === 0) {
          alert("Por favor, complete seu cadastro antes de publicar um post.");
          navigate("Profile");
          return;
        }

        const postWithUserId = {
          title: title,
          content: content,
          idpub: user?.uid || "",
          likes: [] as string[],
        };

        const docRef = await addDoc(collection(db, "posts"), postWithUserId);

        const updatedPosts = [...posts, { ...postWithUserId, id: docRef.id }];
        setPosts(updatedPosts as any);
        Alert.alert("Post criado com sucesso.");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const sharePost = async (title: string, content: string) => {
    try {
      const shareMessage = `${title}\n\n${content}`;

      const fileUri = FileSystem.cacheDirectory + "post.txt";
      await FileSystem.writeAsStringAsync(fileUri, shareMessage);
      await Sharing.shareAsync(fileUri);
    } catch (error) {}
  };

  const onLikePress = async (postId: string) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) {
        return;
      }

      const postData = postDoc.data() as Post;

      const currentUserLiked = postData.likes?.includes(user?.uid || "");
      const updatedLikes = currentUserLiked
        ? postData.likes?.filter((userId) => userId !== user?.uid) || []
        : [...(postData.likes || []), user?.uid || ""];

      await updateDoc(postRef, { likes: updatedLikes });

      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, likes: updatedLikes } : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error occurred while processing like:", error);
    }
  };

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header title="HeartCare" />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            item={item}
            onLikePress={onLikePress}
            sharePost={sharePost}
            user={user}
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
        }
      />
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={abrirModal}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <ModalPost
        fecharModal={fecharModal}
        visivel={modalVisivel}
        createNewPost={createNewPost}
        loading={loading}
      />
    </View>
  );
}

export default Feed;
