<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100">
      <!-- Top Navigation Bar -->
      <div class="bg-[#a8f6b4] w-full py-4 px-8 flex justify-between items-center shadow-md">
        <div class="flex items-center">
          <img src="" alt="Logo" class="h-10" /> <!-- Placeholder for logo -->
        </div>
        <div class="flex items-center">
          <img :src="profileImage" class="w-8 h-8 rounded-full mr-4" alt="Profile Image" />
          <button class="bg-[#ff6e6e] text-white px-4 py-2 rounded-lg" @click="signOut">Sign out</button>
        </div>
      </div>
  
      <!-- Profile Content -->
      <div class="bg-white mt-6 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <!-- Profile Header -->
        <div class="flex items-center space-x-4">
          <img :src="profileImage" class="w-20 h-20 rounded-full" alt="Student Profile Picture" />
          <div>
            <h1 v-if="!isEditing" class="text-xl font-bold">{{ name || 'Name Placeholder' }}</h1>
            <input v-else v-model="name" class="text-xl font-bold bg-gray-100 p-2 rounded-lg" />
  
            <p v-if="!isEditing" class="text-gray-500">{{ department || 'Skill path student' }}</p>
            <input v-else v-model="department" class="text-gray-500 bg-gray-100 p-2 rounded-lg" />
          </div>
        </div>
  
        <!-- Latest Messages Section -->
        <div class="mt-6">
          <h2 class="text-lg font-semibold">Latest messages</h2>
          <textarea v-if="isEditing" v-model="latestMessage" class="bg-[#f7f7f7] p-2 rounded-lg w-full mt-2"></textarea>
          <p v-else>{{ latestMessage || "Looks like you haven't spoken to Roëlla yet" }}</p>
  
          <button class="bg-[#66d978] text-white px-4 py-2 rounded-lg w-full mt-2" @click="sendMessage">Talk to Roëlla</button>
        </div>
  
        <!-- Contact Information Section -->
        <div class="mt-8">
          <h2 class="text-lg font-semibold">Contact Information</h2>
          <p><strong>Phone number:</strong></p>
          <textarea v-if="isEditing" v-model="phone" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ phone || '+31 6 12 34 56 78' }}</p>
  
          <p class="mt-4"><strong>Email:</strong></p>
          <textarea v-if="isEditing" v-model="email" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ email || 'roella.doe@gmail.com' }}</p>
  
          <p class="mt-4"><strong>LinkedIn:</strong></p>
          <textarea v-if="isEditing" v-model="linkedin" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ linkedin || 'linkedin.com/in/roelladoe' }}</p>
  
          <p class="mt-4"><strong>GitHub:</strong></p>
          <textarea v-if="isEditing" v-model="github" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ github || 'github.com/ro314' }}</p>
        </div>
  
        <!-- About Them Section -->
        <div class="mt-8">
          <h2 class="text-lg font-semibold">About Them</h2>
          <p><strong>Spoken languages:</strong></p>
          <textarea v-if="isEditing" v-model="languages" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ languages || 'Dutch, English, Spanish' }}</p>
  
          <p class="mt-4"><strong>Primary programming languages:</strong></p>
          <textarea v-if="isEditing" v-model="programmingLanguages" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ programmingLanguages || 'Rust, TypeScript, Go' }}</p>
        </div>
  
        <!-- Professional Experience Section -->
        <div class="mt-8">
          <h2 class="text-lg font-semibold">Professional Experience</h2>
          <p><strong>Current job:</strong></p>
          <textarea v-if="isEditing" v-model="currentJob" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ currentJob || 'Intern Developer at Agency B.V.' }}</p>
  
          <p class="mt-4"><strong>Previous job:</strong></p>
          <textarea v-if="isEditing" v-model="previousJob" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ previousJob || 'Waiter at Restaurant X' }}</p>
        </div>
  
        <!-- CV Section -->
        <div class="mt-8">
          <div v-if="isEditing">
            <input type="file" @change="uploadCV" accept="application/pdf" class="bg-[#f7f7f7] p-2 rounded-lg w-full" />
          </div>
          <div v-else>
            <button @click="openCV" class="bg-[#66d978] text-white px-4 py-2 rounded-lg w-full">
              Open CV
            </button>
          </div>
        </div>
  
        <!-- Edit and Save Buttons -->
        <div class="mt-4 flex justify-between">
          <button v-if="!isEditing" @click="isEditing = true" class="bg-[#4CAF50] text-white px-4 py-2 rounded-lg">
            Edit Profile
          </button>
          <button v-if="isEditing" @click="saveProfile" class="bg-[#FF6E6E] text-white px-4 py-2 rounded-lg">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { supabase } from '../utils/supabase'; 
  
  const isEditing = ref(false); // Controls edit mode
  const profileImage = ref('/profile-placeholder.png');
  const name = ref('Roëlla Doe');
  const department = ref('Skill path student');
  const latestMessage = ref("Looks like you haven't spoken to Roëlla yet");
  const phone = ref('+31 6 12 34 56 78');
  const email = ref('roella.doe@gmail.com');
  const linkedin = ref('linkedin.com/in/roelladoe');
  const github = ref('github.com/ro314');
  const languages = ref('Dutch, English, Spanish');
  const programmingLanguages = ref('Rust, TypeScript, Go');
  const currentJob = ref('Intern Developer at Agency B.V.');
  const previousJob = ref('Waiter at Restaurant X');
  const cvUrl = ref(''); // Holds the URL of the uploaded CV
  
  // Fetch profile data on component mount
  onMounted(async () => {
    const { data, error } = await supabase
      .from('profiles') // Adjust your table name here
      .select('*')
      .eq('id', 1); // Example ID, adjust as needed
  
    if (error) {
      console.error('Error fetching data:', error);
    } else if (data && data.length > 0) {
      const profile = data[0];
      name.value = profile.name;
      department.value = profile.department;
      latestMessage.value = profile.latestMessage;
      phone.value = profile.phone;
      email.value = profile.email;
      linkedin.value = profile.linkedin;
      github.value = profile.github;
      languages.value = profile.languages;
      programmingLanguages.value = profile.programmingLanguages;
      currentJob.value = profile.currentJob;
      previousJob.value = profile.previousJob;
      cvUrl.value = profile.cvUrl;
      profileImage.value = profile.profileImage || '/profile-placeholder.png';
    }
  });
  
  // Handle profile saving
  const saveProfile = async () => {
    isEditing.value = false;
  
    const { error } = await supabase
      .from('profiles') // Adjust your table name here
      .upsert({
        id: 1, // Example ID, adjust as needed
        name: name.value,
        department: department.value,
        latestMessage: latestMessage.value,
        phone: phone.value,
        email: email.value,
        linkedin: linkedin.value,
        github: github.value,
        languages: languages.value,
        programmingLanguages: programmingLanguages.value,
        currentJob: currentJob.value,
        previousJob: previousJob.value,
        cvUrl: cvUrl.value,
        profileImage: profileImage.value,
      });
  
    if (error) {
      console.error('Error saving data:', error);
    }
  };
  
  // Open CV in a new tab
  const openCV = () => {
    if (cvUrl.value) {
      window.open(cvUrl.value, '_blank');
    }
  };
  
  // Handle CV upload
  const uploadCV = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Logic to upload the PDF and get the URL
      const { data, error } = await supabase
        .storage
        .from('cv-bucket') // Adjust your storage bucket name here
        .upload(`cv/${file.name}`, file);
  
      if (error) {
        console.error('Error uploading CV:', error);
      } else {
        const { publicURL, error: urlError } = supabase
          .storage
          .from('cv-bucket') // Adjust your storage bucket name here
          .getPublicUrl(`cv/${file.name}`);
  
        if (urlError) {
          console.error('Error getting public URL:', urlError);
        } else {
          cvUrl.value = publicURL;
        }
      }
    }
  };
  
  // Handle sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      // Redirect or update the UI as needed
    }
  };
  </script>
  
  <style scoped>
  /* Custom styles here */
  </style>
  