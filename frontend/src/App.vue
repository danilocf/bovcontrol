<template>
  <v-app>
    <Logo />

    <Menu v-model="menu" />

    <v-content>
      <v-container fluid class="py-0">
        <v-row>
          <v-col cols="12" md="5" class="pa-0 d-none d-md-block">
            <Map :markers="mapMarkers" />
          </v-col>
          <v-col cols="12" md="7" class="pa-0">
            <div class="d-flex flex-wrap py-4 px-2 FormContainer">
              <Loading v-if="loading" />
              <AlertNoFarm v-else-if="!farms.length" @showDialog="showDialog" />
              <template v-else>
                <CardFarm
                  v-for="(farm, index) in farms"
                  :key="index"
                  :farm="farm"
                  :labels="labels"
                  :showActions="showActions"
                  @showDialog="showDialog"
                />
              </template>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-bottom-sheet v-model="dialogInfo">
      <SheetFarm
        :selectedFarm="selectedFarm"
        :labels="labels"
        :showActions="showActions"
        @showDialog="showDialog"
        @close="dialogInfo = false"
      />
    </v-bottom-sheet>

    <BtnAdd :showActions="showActions" @showDialog="showDialog" />

    <!-- TODO: isolate in a component -->
    <v-dialog v-model="dialogForm" width="400px">
      <v-card>
        <v-card-title>
          <template v-if="dialogFormAction === 'add'">Add new Farm</template>
          <template v-else-if="dialogFormAction === 'edit'">Edit Farm</template>
          <template v-else-if="dialogFormAction === 'delete'">
            Delete Farm
          </template>
        </v-card-title>
        <v-container>
          <v-form ref="form" v-model="form.valid" lazy-validation>
            <v-file-input
              v-if="dialogFormAction !== 'delete'"
              v-model="form.image"
              :loading="form.imageLoading"
              :disabled="form.loading || form.imageLoading"
              accept="image/*"
              show-size
              :label="labels['image']"
              :id="labels['image']"
              :rules="form.imageRule"
              dense
              hint="Optional"
              persistent-hint
            ></v-file-input>
            <v-text-field
              v-model="selectedFarm.name"
              :rules="form.basicRule"
              :label="labels['name']"
              :id="labels['name']"
              :disabled="
                dialogFormAction === 'delete' ||
                  form.loading ||
                  form.imageLoading
              "
              required
              dense
            />
            <v-text-field
              v-model="selectedFarm.owner"
              :rules="form.basicRule"
              :label="labels['owner']"
              :id="labels['owner']"
              :disabled="
                dialogFormAction === 'delete' ||
                  form.loading ||
                  form.imageLoading
              "
              required
              dense
            />
            <v-text-field
              v-model="selectedFarm.address"
              :rules="form.basicRule"
              :label="labels['address']"
              :id="labels['address']"
              :disabled="
                dialogFormAction === 'delete' ||
                  form.loading ||
                  form.imageLoading
              "
              required
              dense
            />
            <v-text-field
              v-model="selectedFarm.lat"
              :rules="form.basicRule"
              :label="labels['lat']"
              :id="labels['lat']"
              :disabled="
                dialogFormAction === 'delete' ||
                  form.loading ||
                  form.imageLoading
              "
              required
              dense
            />
            <v-text-field
              v-model="selectedFarm.long"
              :rules="form.basicRule"
              :label="labels['long']"
              :id="labels['long']"
              :disabled="
                dialogFormAction === 'delete' ||
                  form.loading ||
                  form.imageLoading
              "
              required
              dense
            />
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialogForm = false">Cancel</v-btn>
          <v-btn
            :outlined="dialogFormAction === 'delete'"
            :color="dialogFormAction === 'delete' ? 'error' : 'primary'"
            :loading="form.loading || form.imageLoading"
            :disabled="form.loading || form.imageLoading"
            depressed
            @click="onSubmit"
          >
            <template v-if="dialogFormAction === 'add'">Submit</template>
            <template v-else-if="dialogFormAction === 'edit'">Save</template>
            <template v-else-if="dialogFormAction === 'delete'">
              {{
                dialogFormDeleteConfirmation
                  ? "Click again to confirm"
                  : "Delete"
              }}
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- TODO: isolate in a component -->
    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top>
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import Map from "@/components/Map";
import Loading from "@/components/Loading";
import AlertNoFarm from "@/components/AlertNoFarm";
import CardFarm from "@/components/CardFarm";
import SheetFarm from "@/components/SheetFarm";
import BtnAdd from "@/components/BtnAdd";
import ServiceApi from "@/services/ServiceApi";

export default {
  name: "App",
  components: {
    Logo,
    Menu,
    Map,
    Loading,
    AlertNoFarm,
    CardFarm,
    SheetFarm,
    BtnAdd
  },
  data: () => ({
    loading: false,
    menu: "View",
    dialogInfo: false,
    dialogForm: false,
    dialogFormAction: null,
    dialogFormDeleteConfirmation: false,
    snackbar: {
      show: false,
      timeout: 3000,
      text: null
    },
    farms: [],
    selectedFarm: {
      id: null,
      image: {},
      name: null,
      owner: null,
      address: null,
      lat: null,
      long: null,
      created_at: null,
      updated_at: null
    },
    form: {
      loading: false,
      loadingImage: false,
      image: null,
      valid: false,
      basicRule: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 240) ||
          "This field must be less than 240 characters"
      ],
      imageRule: []
    },
    labels: {
      id: "ID",
      image: "Image",
      name: "Name",
      owner: "Owner",
      address: "Address",
      lat: "Latitude",
      long: "Longitude",
      created_at: "Created at",
      updated_at: "Updated at"
    },
    mapMarkers: []
  }),
  watch: {
    dialogForm(v) {
      if (!v) {
        this.dialogFormDeleteConfirmation = false;
        this.resetForm();
      }
    }
  },
  computed: {
    showActions() {
      return this.menu === "Settings";
    }
  },
  mounted() {
    this.apiIndex();
  },
  methods: {
    showDialog({ dialog, action, farm }) {
      if (farm) {
        this.selectedFarm.id = farm.id;
        this.selectedFarm.image = farm.image;
        this.selectedFarm.name = farm.name;
        this.selectedFarm.owner = farm.owner;
        this.selectedFarm.address = farm.address;
        this.selectedFarm.lat = farm.lat;
        this.selectedFarm.long = farm.long;
        this.selectedFarm.created_at = farm.created_at;
        this.selectedFarm.updated_at = farm.updated_at;
      }
      if (action) {
        this.dialogFormAction = action;
        if (action === "add") {
          this.resetForm();
        }
      }
      this.dialogInfo = dialog === "info";
      this.dialogForm = dialog === "form";
    },

    showSnackbar({ text }) {
      this.snackbar.show = true;
      this.snackbar.text = text;
    },

    async onSubmit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.dialogFormAction === "add") {
          await this.apiStore();
        } else if (this.dialogFormAction === "edit") {
          await this.apiUpdate();
        } else if (this.dialogFormAction === "delete") {
          if (!this.dialogFormDeleteConfirmation) {
            this.dialogFormDeleteConfirmation = true;
            return;
          }
          await this.apiDestroy();
        }
        this.dialogForm = false;
      }
    },

    resetForm() {
      this.form.image = {};
      this.selectedFarm.id = null;
      this.selectedFarm.image = {};
      this.selectedFarm.name = null;
      this.selectedFarm.owner = null;
      this.selectedFarm.address = null;
      this.selectedFarm.lat = null;
      this.selectedFarm.long = null;
      this.selectedFarm.created_at = null;
      this.selectedFarm.updated_at = null;
      this.$refs.form && this.$refs.form.resetValidation();
    },

    async apiIndex() {
      try {
        this.loading = true;
        this.mapMarkers = [];
        const { data } = await ServiceApi.index();
        this.farms = data.map(i => {
          i.imageLoaded = "";
          i.imageLoading = true;
          this.mapMarkers.push([i.lat, i.long]);
          return i;
        });
        console.log("index", JSON.stringify(data));
      } catch (error) {
        console.log("error", error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 500);
        this.farms.forEach(i => {
          if (!i.image) return;
          this.apiShowImage({ id: i.id });
        });
      }
    },

    async apiShowImage({ id }) {
      let farm;
      try {
        farm = this.farms.find(f => f.id === id);
        farm.imageLoading = true;
        const { data } = await ServiceApi.showImage({ id });
        const fr = new FileReader();
        fr.onload = () => {
          farm.imageLoaded = fr.result || "";
        };
        fr.readAsDataURL(data);
        console.log("showImage", id);
      } catch (error) {
        console.log("error", error);
      } finally {
        farm.imageLoading = false;
      }
    },

    async apiStore() {
      try {
        this.form.loading = true;
        const { data } = await ServiceApi.store({ ...this.selectedFarm });
        console.log("store", JSON.stringify(data));
        this.showSnackbar({ text: "Success! Farm added" });
        await this.apiUpload(data.id);
      } catch (error) {
        console.log("error", error);
        this.showSnackbar({ text: "Error during store! Try again later" });
      } finally {
        this.form.loading = false;
        this.apiIndex();
      }
    },

    async apiUpdate() {
      try {
        this.form.loading = true;
        const { data } = await ServiceApi.update({ ...this.selectedFarm });
        console.log("update", JSON.stringify(data));
        this.showSnackbar({ text: "Success! Farm saved" });
        await this.apiUpload(data.id);
      } catch (error) {
        console.log("error", error);
        this.showSnackbar({ text: "Error during update! Try again later" });
      } finally {
        this.form.loading = false;
        this.apiIndex();
      }
    },

    async apiUpload(id) {
      if (!this.form.image || !this.form.image.length) return;
      try {
        this.form.loadingImage = true;
        const formData = new FormData();
        formData.append("image", this.form.image);
        const { data } = await ServiceApi.upload({
          id,
          formData
        });
        console.log("upload", JSON.stringify(data));
        this.showSnackbar({ text: "Success! Image uploaded" });
      } catch (error) {
        console.log("error", error);
        this.showSnackbar({ text: "Error during upload! Try again later" });
      } finally {
        this.form.loadingImage = false;
      }
    },

    async apiDestroy() {
      try {
        this.form.loading = true;
        const { data } = await ServiceApi.destroy({ id: this.selectedFarm.id });
        console.log("destroy", JSON.stringify(data));
        this.showSnackbar({ text: "Success! Farm deleted" });
      } catch (error) {
        console.log("error", error);
        this.showSnackbar({ text: "Error during destroy! Try again later" });
      } finally {
        this.form.loading = false;
        this.apiIndex();
      }
    }
  }
};
</script>

<style lang="scss">
.FormContainer {
  max-height: calc(100vh - 56px);
  overflow: auto;

  @media screen and (max-width: 960px) {
    height: initial;
  }
}
</style>
