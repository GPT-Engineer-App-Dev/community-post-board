import { Container, VStack, Box, Heading, Text, Input, Textarea, Button, Flex, Spinner } from "@chakra-ui/react";
import { usePosts, useAddPost, useAddReaction } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: posts, isLoading, isError, error } = usePosts();
  const addPostMutation = useAddPost();
  const addReactionMutation = useAddReaction();
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.body) {
      addPostMutation.mutate(newPost);
      setNewPost({ title: "", body: "" });
    }
  };

  const handleAddReaction = (postId, emoji) => {
    addReactionMutation.mutate({ post_id: postId, user_id: "user-id-placeholder", emoji });
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Box as="nav" bg="blue.500" color="white" p={4} mb={6}>
        <Heading size="lg">Public Post Board</Heading>
      </Box>

      <VStack spacing={6} align="stretch">
        <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
          <Heading size="md" mb={4}>Create a New Post</Heading>
          <Input
            placeholder="Title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            mb={3}
          />
          <Textarea
            placeholder="Content"
            name="body"
            value={newPost.body}
            onChange={handleInputChange}
            mb={3}
          />
          <Button type="submit" colorScheme="blue" isLoading={addPostMutation.isLoading}>Submit</Button>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Posts</Heading>
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <Text>Error: {error.message}</Text>
          ) : posts.length === 0 ? (
            <Text>No posts yet. Be the first to post!</Text>
          ) : (
            posts.map((post) => (
              <Box key={post.id} p={4} borderWidth={1} borderRadius="md" boxShadow="md" mb={4}>
                <Heading size="sm" mb={2}>{post.title}</Heading>
                <Text mb={2}>{post.body}</Text>
                <Flex>
                  <Button size="sm" onClick={() => handleAddReaction(post.id, "👍")}>👍</Button>
                  <Button size="sm" onClick={() => handleAddReaction(post.id, "❤️")}>❤️</Button>
                  <Button size="sm" onClick={() => handleAddReaction(post.id, "😂")}>😂</Button>
                </Flex>
              </Box>
            ))
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;