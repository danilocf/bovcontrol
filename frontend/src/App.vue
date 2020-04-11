<template>
  <v-app>
    <img src="@/assets/logo.svg" class="Logo" />

    <v-bottom-navigation v-model="menu" app dark shift mandatory>
      <v-btn value="View">
        <span>View</span>
        <v-icon>visibility</v-icon>
      </v-btn>
      <v-btn value="Settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-content>
      <v-container fluid class="py-0">
        <v-row>
          <v-col cols="12" md="5" class="pa-0 d-none d-md-block">
            <l-map
              style="height: calc(100vh - 56px); z-index: 0;"
              :zoom="map.zoom"
              :center="map.center"
            >
              <l-tile-layer :url="map.url" />
              <l-marker
                v-for="(mark, index) in map.markers"
                :key="index"
                :lat-lng="mark"
              />
            </l-map>
          </v-col>
          <v-col cols="12" md="7">
            <div class="d-flex flex-wrap">
              <div
                v-if="loading"
                class="Loading d-flex justify-center align-center"
              >
                <v-progress-circular
                  :size="50"
                  width="5"
                  color="primary"
                  indeterminate
                />
              </div>
              <v-alert
                v-else-if="!farms.length"
                border="left"
                outlined
                block
                type="warning"
                width="100%"
              >
                No farm added yet.
                <a
                  class="orange--text"
                  @click="showDialog({ dialog: 'form', action: 'add' })"
                  ><b>Click here to add.</b></a
                >
              </v-alert>
              <template v-else>
                <v-card
                  v-for="(farm, index) in farms"
                  :key="index"
                  outlined
                  class="Card font-weight-medium mb-4 mx-2"
                >
                  <v-fab-transition>
                    <div v-show="showActions" class="Card__actions">
                      <v-btn
                        color="warning"
                        fab
                        x-small
                        class="mr-2"
                        @click="
                          showDialog({ dialog: 'form', action: 'edit', farm })
                        "
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        color="error"
                        fab
                        x-small
                        @click="
                          showDialog({ dialog: 'form', action: 'delete', farm })
                        "
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </div>
                  </v-fab-transition>
                  <v-skeleton-loader
                    v-if="farm.imageLoading"
                    type="image"
                    max-height="170px"
                  />
                  <v-img v-else :src="farm.imageLoaded" height="170px" />
                  <v-card-text
                    class="Card__content pb-2"
                    @click="showDialog({ dialog: 'info', farm })"
                  >
                    <v-fab-transition>
                      <div v-show="showActions" class="Card__icon-info">
                        <v-icon>info_outline</v-icon>
                      </div>
                    </v-fab-transition>
                    <h3 class="black--text mb-1">
                      {{ farm.name }}
                    </h3>
                    <p class="mb-2">
                      <small class="font-weight-light text--secondary">
                        {{ labels["owner"] }}
                      </small>
                      {{ farm.owner }}
                    </p>
                    <small
                      class="Card__coordinates d-inline-flex align-center text--secondary mb-0"
                    >
                      <v-icon small>room</v-icon>
                      +{{ farm.lat }} -{{ farm.long }}
                    </small>
                  </v-card-text>
                </v-card>
              </template>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-bottom-sheet v-model="dialogInfo">
      <v-sheet class="Sheet">
        <v-icon size="50" class="Sheet__icon-info">
          info_outline
        </v-icon>
        <div class="Sheet__btns-wrapper-top">
          <v-btn
            depressed
            small
            width="100"
            color="primary white--text mb-2"
            @click="dialogInfo = false"
            >Close<v-icon right color="white">close</v-icon></v-btn
          >
        </div>
        <div v-show="showActions" class="Sheet__btns-wrapper-bottom">
          <v-btn
            depressed
            small
            width="100"
            color="warning white--text mb-2"
            @click="
              showDialog({ dialog: 'form', action: 'edit', farm: selectedFarm })
            "
          >
            Edit
            <v-icon right color="white">edit</v-icon>
          </v-btn>
          <br />
          <v-btn
            depressed
            small
            width="100"
            color="error white--text"
            @click="
              showDialog({
                dialog: 'form',
                action: 'delete',
                farm: selectedFarm
              })
            "
          >
            Delete
            <v-icon right color="white">delete</v-icon>
          </v-btn>
        </div>
        <div class="Sheet__container py-5 py-md-0 ma-auto">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <template v-for="(val, key, index) in selectedFarm">
                  <tr v-if="key !== 'image'" :key="index">
                    <td>
                      <small class="font-weight-light text--secondary">
                        {{ labels[key] }}
                      </small>
                    </td>
                    <td>{{ val }}</td>
                  </tr>
                </template>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-fab-transition>
      <v-btn
        v-show="showActions"
        bottom
        color="primary"
        dark
        fab
        fixed
        right
        large
        @click="showDialog({ dialog: 'form', action: 'add' })"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

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
              label="Image"
              :rules="
                dialogFormAction === 'edit'
                  ? form.editImageRule
                  : form.imageRule
              "
              dense
            ></v-file-input>
            <v-text-field
              v-model="selectedFarm.name"
              :rules="form.basicRule"
              :label="labels['name']"
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

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top>
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";

export default {
  name: "App",
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
      editImageRule: [
        v => !v || v.size < 2000000 || "Image size should be less than 2 MB!"
      ],
      imageRule: [
        v => !!v || "This field is required",
        v => !v || v.size < 2000000 || "Image size should be less than 2 MB!"
      ]
    },
    labels: {
      id: "ID",
      name: "Name",
      owner: "Owner",
      address: "Address",
      lat: "Latitude",
      long: "Longitude",
      created_at: "Created at",
      updated_at: "Updated at"
    },
    map: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 3,
      center: [10.223945, -80.442116],
      markers: []
    }
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
        this.map.markers = [];
        const { data } = await ServiceApi.index();
        this.farms = data.map(i => {
          i.imageLoaded = "";
          i.imageLoading = true;
          this.map.markers.push([i.lat, i.long]);
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
      if (!this.form.image) return;
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
.Logo {
  position: fixed;
  top: 0;
  left: 44px;
  z-index: 1000;

  @media screen and (max-width: 960px) {
    position: initial;
    margin: auto;
    z-index: 0;
  }
}

// .Map {
//   height: calc(100vh - 56px);
//   z-index: 0;
// }

.Loading {
  width: 100%;
  height: calc(100vh - 100px);
}

.Card {
  width: 250px;

  @media screen and (max-width: 600px) {
    overflow: hidden;
    width: 100%;
  }
}

.Card__actions {
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 100;

  @media screen and (max-width: 600px) {
    top: 10px;
    right: 10px;
  }
}

.Card__content {
  cursor: pointer;
}

.Card__icon-info {
  position: absolute;
  top: 180px;
  right: 10px;
  z-index: 1;
}

.Card__coordinates {
  font-size: 0.8rem;
}

.Sheet {
  height: 280px;
  position: relative;

  @media screen and (max-width: 960px) {
    height: 75vh;
  }
}

.Sheet__icon-info {
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.5;
}

.Sheet__btns-wrapper-top {
  position: absolute;
  top: 10px;
  right: 10px;
}

.Sheet__btns-wrapper-bottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.Sheet__container {
  max-width: 70vw;

  @media screen and (max-width: 960px) {
    max-width: 100%;
  }
}
</style>
