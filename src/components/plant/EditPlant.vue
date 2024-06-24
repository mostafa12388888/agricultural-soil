<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="localDialog" max-width="600">
      <v-card>
        <v-card-title>
          <v-icon left>mdi-account</v-icon>
          Edit Plant
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-file-input
                v-model="image"
                label="Upload Image*"
                prepend-icon="mdi-file"
                accept="image/*"
                required
                @change="previewImage"
                :error-messages="
                  v$.image.$error ? v$.image.$errors[0].$message : ''
                "
                class="w-100"
              ></v-file-input>
              <v-img
                :src="imagePreview"
                v-if="imagePreview"
                class="mt-3"
                height="100"
                contain
              ></v-img>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Name *"
                hint="Enter the required  Name"
                persistent-hint
                required
                :error-messages="
                  v$.name.$error ? v$.name.$errors[0].$message : ''
                "
                v-model="name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Water L*"
                hint="Enter the required amount of water"
                persistent-hint
                required
                v-model="watering"
                :error-messages="
                  v$.watering.$error ? v$.watering.$errors[0].$message : ''
                "
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Temperature*"
                hint="Enter the required amount of Temperature"
                persistent-hint
                v-model="temperature"
                :error-messages="
                  v$.temperature.$error
                    ? v$.temperature.$errors[0].$message
                    : ''
                "
                required
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Humidity*"
                hint="Enter the required amount of Humidity"
                persistent-hint
                required
                :error-messages="
                  v$.humidity.$error ? v$.humidity.$errors[0].$message : ''
                "
                v-model="humidity"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Soil Humidity*"
                hint="Enter the required amount of Soil Humidity"
                persistent-hint
                required
                v-model="soilHumidity"
                :error-messages="
                  v$.soilHumidity.$error
                    ? v$.soilHumidity.$errors[0].$message
                    : ''
                "
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text variant="plain" @click="closeDialog">Close</v-btn>
          <v-btn color="primary" text variant="tonal" @click="saveDialog"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, numeric } from "@vuelidate/validators";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  props: {
    dialogs: {
      type: Boolean,
      required: true,
    },
    plant: Object,
    index: Number,
  },
  setup(props, { emit }) {
    const localDialog = ref(props.dialogs);
    const image = ref(null);
    const imagePreview = ref(null);
    const soilHumidity = ref(props.plant.soil_Humidity);
    const watering = ref(props.plant.watering);
    const temperature = ref(props.plant.temperature);
    const humidity = ref(props.plant.humidity);
    const name = ref(props.plant.name);

    const v$ = useVuelidate(
      {
        name: { required, minLength: minLength(3) },
        image: { required },
        soilHumidity: { required, numeric },
        humidity: { required, numeric },
        watering: { required, numeric },
        temperature: { required, numeric },
      },
      {
        name,
        image,
        soilHumidity,
        humidity,
        watering,
        temperature,
      }
    );

    watch(
      () => props.dialogs,
      (newVal) => {
        localDialog.value = newVal;
      }
    );

    watch(localDialog, (newVal) => {
      emit("update:dialogs", newVal);
    });

    const closeDialog = () => {
      localDialog.value = false;
    };

    const saveDialog = async () => {
      v$.value.$validate();
      if (!v$.value.$error) {
        try {
          const token = Cookies.get("token");
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };

          const formData = new FormData();
          formData.append("temperature", temperature.value);
          formData.append("watering", watering.value);
          formData.append("humidity", humidity.value);
          formData.append("name", name.value);
          formData.append("image", image.value);
          formData.append("soilHumidity", soilHumidity.value);

          const result = await axios.post(`/plant-admin/${props.plant.id}`, formData, {
            headers,
          });
          if (result.status === 200) {
            imagePreview.value = null;
            emit("updatePlant", props.index, result.data);
          }
        } catch (error) {
          console.log(error);
        }
        localDialog.value = false;
      }
    };

    const previewImage = () => {
      if (image.value && image.value.length) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(image.value);
      }
    };

    return {
      localDialog,
      image,
      imagePreview,
      soilHumidity,
      watering,
      temperature,
      humidity,
      name,
      v$,
      closeDialog,
      saveDialog,
      previewImage,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles for your component here */
</style>
