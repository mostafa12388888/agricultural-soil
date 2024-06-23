<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="localDialog" max-width="600">
      <v-card>
        <v-card-title>
          <v-icon left>mdi-account</v-icon>
          Add New Plant
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <v-file-input
                v-model="file"
                label="Upload Image*"
                prepend-icon="mdi-file"
                accept="image/*"
                required
                @change="previewImage"
                class="w-100"
              ></v-file-input>
            </v-col>
           
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Water L*"
                hint="Enter the required amount of water"
                persistent-hint
                required
                v-model="water"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Temperature*"
                hint="Enter the required amount of Temperature"
                persistent-hint
                v-model="temperature"
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
                v-model="humidity"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                label="Soil Humidity*"
                hint="Enter the required amount of Soil Humidity "
                persistent-hint
                required
                v-model="soilHumidity"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>
          
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeDialog">Close</v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="saveDialog"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
export default {
  props: {
    dialogs: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localDialog: this.dialogs,
      file: null,
      imagePreview: null,
      soilHumidity:'',
      water:'',
      temperature:'',
      humidity:'',
     
    };
  },
  watch: {
    dialogs(newVal) {
      this.localDialog = newVal;
    },
    localDialog(newVal) {
      this.$emit("update:dialogs", newVal);
    },
  },
  methods: {
    rules(){
        
    },
    closeDialog() {
      this.localDialog = false;
    },
    saveDialog() {
      // Implement save logic here if needed
      
      this.localDialog = false;
    },
    previewImage() {
      if (this.file && this.file.length) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(this.file);
      }
    },
  },
};
</script>
  
  <style scoped>
/* Add any specific styles for your component here */
</style>
  