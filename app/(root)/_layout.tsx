import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
      <Stack.Screen name="my-account" options={{ title: "My Account" }} />
      <Stack.Screen
        name="favourite-orders"
        options={{ title: "Favorite Orders" }}
      />
      <Stack.Screen name="send-feedback" options={{ title: "Send Feedback" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="restaurant" options={{ title: "" }} />
      <Stack.Screen name="category" options={{ title: "" }} />
      <Stack.Screen name="reviews" options={{ title: "Reviews" }} />
      <Stack.Screen name="location" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
