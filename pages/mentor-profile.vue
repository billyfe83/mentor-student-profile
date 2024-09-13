<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100">
    <!-- Top Navigation Bar -->
    <div class="bg-[#a8f6b4] w-full py-4 px-8 flex justify-between items-center shadow-md">
      <div class="flex items-center">
        <img src="" alt="Logo" class="h-10" /> <!-- Placeholder for logo -->
      </div>
      <div class="flex items-center">
        <img :src="profileImage" class="w-8 h-8 rounded-full mr-4" alt="Profile Image" />
        <button class="bg-[#ff6e6e] text-white px-4 py-2 rounded-lg">Sign out</button>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="bg-white mt-6 p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
      <!-- Profile Header -->
      <div class="flex items-center space-x-4 flex-col md:flex-row">
        <img :src="profileImage" class="w-20 h-20 rounded-full" alt="Mentor Profile Picture" />
        <div class="text-center md:text-left">
          <h1 class="text-xl font-bold">{{ name || 'Mentor Name' }}</h1>
          <p class="text-gray-500">{{ title || 'Professional Title' }}</p>
        </div>
      </div>

      <!-- Latest Messages Section -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold">Latest Messages</h2>
        <textarea v-if="isEditing" v-model="latestMessage" class="bg-[#f7f7f7] p-2 rounded-lg w-full mt-2"></textarea>
        <p v-else>{{ latestMessage || "Looks like you haven't received any messages yet" }}</p>

        <!-- Talk to Mentor Button -->
        <button class="bg-[#66d978] text-white px-4 py-2 rounded-lg w-full mt-2">Talk to Hidda</button>
      </div>

      <!-- Contact Information -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold">Contact Information</h2>
        <p><strong>Phone number:</strong></p>
        <textarea v-if="isEditing" v-model="phone" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
        <p v-else>{{ phone || '+31 6 12 34 56 78' }}</p>

        <p class="mt-4"><strong>Email:</strong></p>
        <textarea v-if="isEditing" v-model="email" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
        <p v-else>{{ email || 'mentor.email@example.com' }}</p>

        <p class="mt-4"><strong>LinkedIn:</strong></p>
        <textarea v-if="isEditing" v-model="linkedin" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
        <p v-else>{{ linkedin || 'linkedin.com/in/mentor' }}</p>
      </div>

      <!-- Availability Section -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold">Availability</h2>
        <textarea v-if="isEditing" v-model="availability" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
        <p v-else>{{ availability || 'Available Monday to Friday, 9 AM - 5 PM' }}</p>
      </div>

      <!-- Mentorship Focus -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold">Mentorship Focus</h2>
        <textarea v-if="isEditing" v-model="focus" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
        <p v-else>{{ focus || 'Career advice, technical skills, etc.' }}</p>
      </div>

      <!-- Testimonials or Reviews -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold">Testimonials</h2>
        <textarea v-if="isEditing" v-model="testimonials" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
        <p v-else>{{ testimonials || 'Feedback from past mentees' }}</p>
      </div>

      <!-- Resources Section -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold">Resources</h2>
        <textarea v-if="isEditing" v-model="resources" class="bg-[#f7f7f7] p-2 rounded-lg w-full"></textarea>
        <p v-else>{{ resources || 'Links to relevant articles, books, etc.' }}</p>
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

const isEditing = ref(false);
const profileImage = ref('/profile-placeholder.png');
const name = ref('Mentor Name');
const title = ref('Professional Title');
const latestMessage = ref("Looks like you haven't received any messages yet");
const phone = ref('+31 6 12 34 56 78');
const email = ref('mentor.email@example.com');
const linkedin = ref('linkedin.com/in/mentor');
const availability = ref('Available Monday to Friday, 9 AM - 5 PM');
const focus = ref('Career advice, technical skills, etc.');
const testimonials = ref('Feedback from past mentees');
const resources = ref('Links to relevant articles, books, etc.');

// Fetch profile data on component mount
onMounted(async () => {
  const { data, error } = await supabase
    .from('mentors') // Your table name
    .select('*')
    .eq('id', 1); // Example condition, adjust as needed

  if (error) console.error('Error fetching data:', error);
  else {
    const mentor = data[0];
    name.value = mentor.name;
    title.value = mentor.title;
    latestMessage.value = mentor.latestMessage;
    phone.value = mentor.phone;
    email.value = mentor.email;
    linkedin.value = mentor.linkedin;
    availability.value = mentor.availability;
    focus.value = mentor.focus;
    testimonials.value = mentor.testimonials;
    resources.value = mentor.resources;
  }
});

// Handle profile saving
const saveProfile = async () => {
  const { error } = await supabase
    .from('mentors') // Your table name
    .upsert({
      id: 1, // Example ID, adjust as needed
      name: name.value,
      title: title.value,
      latestMessage: latestMessage.value,
      phone: phone.value,
      email: email.value,
      linkedin: linkedin.value,
      availability: availability.value,
      focus: focus.value,
      testimonials: testimonials.value,
      resources: resources.value,
    });

  if (error) console.error('Error saving data:', error);
  isEditing.value = false;
};
</script>

<style scoped>
/* Custom styles */
@media (min-width: 640px) {
  .profile-content {
    padding: 20px;
  }
}
</style>
