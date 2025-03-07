import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useUserStore } from "@/lib/store";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { setPhone } = useUserStore();

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: "91" + form.phone,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        setPhone("91" + form.phone);
        await setActive({ session: signInAttempt.createdSessionId });

        router.replace("/(root)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.welcome} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Hi There 👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="phone"
            placeholder="Enter number"
            icon={icons.email}
            textContentType="phoneNumber"
            value={form.phone}
            onChangeText={(value: string) => setForm({ ...form, phone: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value: string) =>
              setForm({ ...form, password: value })
            }
          />

          <CustomButton
            title="Login"
            onPress={onSignInPress}
            className="mt-6 bg-orange-500"
          />

          {/* <OAuth /> */}

          <Link
            href="/sign-up"
            className="text-base text-center text-general-200 mt-10"
          >
            Don't have an account?{" "}
            <Text className="text-orange-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
