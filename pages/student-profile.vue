<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100">
    <!-- Top Navigation Bar -->
    <div class="bg-[#a8f6b4] w-full py-4 px-4 md:px-8 flex justify-between items-center shadow-md">
      <div class="flex items-center">
        <img src="" alt="Logo" class="h-8 md:h-10" /> <!-- Placeholder for logo -->
      </div>
      <div class="flex items-center">
        <img :src="profileImage" class="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2 md:mr-4" alt="Profile Image" />
        <button class="bg-[#ff6e6e] text-white px-3 md:px-4 py-1 md:py-2 rounded-lg" @click="signOut">Sign out</button>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="bg-white mt-6 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
      <!-- Profile Header -->
      <div class="flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
        <img :src="profileImage" class="w-16 h-16 md:w-20 md:h-20 rounded-full" alt="Student Profile Picture" />
        <div class="text-center md:text-left mt-4 md:mt-0">
          <h1 v-if="!isEditing" class="text-lg md:text-xl font-bold">{{ name || 'Name Placeholder' }}</h1>
          <input v-else v-model="name" class="text-lg md:text-xl font-bold bg-gray-100 p-2 rounded-lg w-full" />
          <p v-if="!isEditing" class="text-gray-500">{{ department || 'Skill path student' }}</p>
          <input v-else v-model="department" class="text-gray-500 bg-gray-100 p-2 rounded-lg w-full" />
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
        <div class="mt-2">
          <strong>Phone number:</strong>
          <textarea v-if="isEditing" v-model="phone" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ phone || '+31 6 12 34 56 78' }}</p>
        </div>

        <div class="mt-4">
          <strong>Email:</strong>
          <textarea v-if="isEditing" v-model="email" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ email || 'roella.doe@gmail.com' }}</p>
        </div>

        <div class="mt-4">
          <strong>LinkedIn:</strong>
          <textarea v-if="isEditing" v-model="linkedin" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ linkedin || 'linkedin.com/in/roelladoe' }}</p>
        </div>

        <div class="mt-4">
          <strong>GitHub:</strong>
          <textarea v-if="isEditing" v-model="github" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ github || 'github.com/ro314' }}</p>
        </div>
      </div>

      <!-- About Them Section -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold">About Them</h2>
        <div class="mt-2">
          <strong>Spoken languages:</strong>
          <textarea v-if="isEditing" v-model="languages" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ languages || 'Dutch, English, Spanish' }}</p>
        </div>

        <div class="mt-4">
          <strong>Primary programming languages:</strong>
          <textarea v-if="isEditing" v-model="programmingLanguages" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ programmingLanguages || 'Rust, TypeScript, Go' }}</p>
        </div>
      </div>

      <!-- Professional Experience Section -->
      <div class="mt-8">
        <h2 class="text-lg font-semibold">Professional Experience</h2>
        <div class="mt-2">
          <strong>Current job:</strong>
          <textarea v-if="isEditing" v-model="currentJob" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ currentJob || 'Intern Developer at Agency B.V.' }}</p>
        </div>

        <div class="mt-4">
          <strong>Previous job:</strong>
          <textarea v-if="isEditing" v-model="previousJob" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
          <p v-else>{{ previousJob || 'Waiter at Restaurant X' }}</p>
        </div>
      </div>

      <!-- CV Section -->
      <div class="mt-8">
        <div v-if="isEditing">
          <input type="file" @change="uploadCV" accept="application/pdf" class="bg-[#f7f7f7] p-2 rounded-lg w-full" />
        </div>
        <div v-else>
          <button @click="openCV" class="bg-[#66d978] text-white px-4 py-2 rounded-lg w-full">Open CV</button>
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
  // The script code remains the same as before
</script>

<style scoped>
  /* Custom styles remain the same */
</style>
