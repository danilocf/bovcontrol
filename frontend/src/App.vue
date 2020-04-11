<template>
  <v-app>
    <!-- FIXME: -->
    <img src="@/assets/logo.svg" style="position: fixed; top: 0; left: 14px" />

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
      <v-container fluid>
        <v-row>
          <v-col cols="5"> </v-col>
          <v-col cols="7">
            <div class="d-flex flex-wrap">
              <v-card
                v-for="(farm, index) in farms"
                :key="index"
                outlined
                class="font-weight-medium mb-4 mx-2"
                width="250px"
              >
                <!-- FIXME: -->
                <v-fab-transition>
                  <div
                    v-show="showActions"
                    style="position: absolute; top: -10px; right: -10px; z-index: 1;"
                  >
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
                <v-img src="@/assets/farm.jpg" height="170px" />
                <!-- FIXME: -->
                <v-card-text
                  class="pb-2"
                  @click="showDialog({ dialog: 'info', farm })"
                  style="cursor: pointer;"
                >
                  <v-fab-transition>
                    <div
                      v-if="showActions"
                      style="position: absolute; top: 180px; right: 10px; z-index: 1;"
                    >
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
                  <!-- FIXME: -->
                  <small
                    class="d-inline-flex align-center text--secondary mb-0"
                    style="font-size: .8rem"
                  >
                    <v-icon small>room</v-icon>
                    +{{ farm.lat }} -{{ farm.long }}
                  </small>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-bottom-sheet v-model="dialogInfo">
      <v-sheet height="220" style="position: relative;">
        <v-icon
          size="50"
          style="position: absolute; top: 10px; left: 10px; opacity: .5;"
        >
          info_outline
        </v-icon>
        <div style="position: absolute; top: 10px; right: 10px;">
          <v-btn
            depressed
            small
            width="100"
            color="primary white--text mb-2"
            @click="dialogInfo = false"
            >Close<v-icon right color="white">close</v-icon></v-btn
          >
        </div>
        <div
          v-show="showActions"
          style="position: absolute; bottom: 10px; right: 10px;"
        >
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
        <div class="py-5 ma-auto" style="max-width: 70vw">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr v-for="(val, key, index) in selectedFarm" :key="index">
                  <td>
                    <small class="font-weight-light text--secondary">
                      {{ labels[key] }}
                    </small>
                  </td>
                  <td>{{ val }}</td>
                </tr>
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
              accept="image/*"
              show-size
              label="Image"
              :rules="
                dialogFormAction === 'edit'
                  ? form.editImageRule
                  : form.imageRule
              "
            ></v-file-input>
            <v-text-field
              v-model="selectedFarm.name"
              :rules="form.basicRule"
              :label="labels['name']"
              :disabled="dialogFormAction === 'delete' || form.loading"
              required
            />
            <v-text-field
              v-model="selectedFarm.owner"
              :rules="form.basicRule"
              :label="labels['owner']"
              :disabled="dialogFormAction === 'delete' || form.loading"
              required
            />
            <v-text-field
              v-model="selectedFarm.address"
              :rules="form.basicRule"
              :label="labels['address']"
              :disabled="dialogFormAction === 'delete' || form.loading"
              required
            />
            <v-text-field
              v-model="selectedFarm.lat"
              :rules="form.basicRule"
              :label="labels['lat']"
              :disabled="dialogFormAction === 'delete' || form.loading"
              required
            />
            <v-text-field
              v-model="selectedFarm.long"
              :rules="form.basicRule"
              :label="labels['long']"
              :disabled="dialogFormAction === 'delete' || form.loading"
              required
            />
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialogForm = false">Cancel</v-btn>
          <v-btn
            :outlined="dialogFormAction === 'delete'"
            :color="dialogFormAction === 'delete' ? 'error' : 'primary'"
            :loading="form.loading"
            depressed
            @click="onSubmit"
          >
            <template v-if="dialogFormAction === 'add'">Submit</template>
            <template v-else-if="dialogFormAction === 'edit'">Save</template>
            <template v-else-if="dialogFormAction === 'delete'">
              {{ dialogFormDeleting ? "Click again to confirm" : "Delete" }}
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";

export default {
  name: "App",
  data: () => ({
    menu: "View",
    dialogInfo: false,
    dialogForm: false,
    dialogFormAction: null,
    dialogFormDeleting: false,
    loading: false,
    farms: [],
    selectedFarm: {
      name: null,
      owner: null,
      address: null,
      lat: null,
      long: null,
      createdAt: null,
      updatedAt: null
    },
    form: {
      image: null,
      loading: false,
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
      createdAt: "Created at",
      updatedAt: "Updated at"
    }
  }),
  watch: {
    dialogForm(v) {
      if (!v) {
        this.dialogFormDeleting = false;
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
        this.selectedFarm.name = farm.name;
        this.selectedFarm.owner = farm.owner;
        this.selectedFarm.address = farm.address;
        this.selectedFarm.lat = farm.lat;
        this.selectedFarm.long = farm.long;
        this.selectedFarm.createdAt = farm.createdAt || farm.created_at;
        this.selectedFarm.updatedAt = farm.updatedAt || farm.updated_at;
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

    onDelete() {
      this.dialogDelete = false;
    },

    onSubmit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.dialogFormAction === "add") {
          this.apiStore();
        } else if (this.dialogFormAction === "edit") {
          this.apiUpdate();
        } else if (this.dialogFormAction === "delete") {
          if (!this.dialogFormDeleting) {
            this.dialogFormDeleting = true;
            return;
          }
          this.apiDestroy();
        }
        this.dialogForm = false;
      }
    },

    resetForm() {
      this.form.image = null;
      this.selectedFarm.name = null;
      this.selectedFarm.owner = null;
      this.selectedFarm.address = null;
      this.selectedFarm.lat = null;
      this.selectedFarm.long = null;
      this.$refs.form && this.$refs.form.resetValidation();
    },

    async apiIndex() {
      try {
        this.loading = true;
        const { data } = await ServiceApi.index();
        this.farms = data;
        console.log("index", JSON.stringify(data));
      } catch (error) {
        console.log("error", error);
      } finally {
        this.loading = true;
      }
    },

    async apiStore() {
      try {
        this.form.loading = true;
        const { data } = await ServiceApi.store({ ...this.selectedFarm });
        console.log("store", JSON.stringify(data));
      } catch (error) {
        console.log("error", error);
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
      } catch (error) {
        console.log("error", error);
      } finally {
        this.form.loading = false;
        this.apiIndex();
      }
    },

    async apiDestroy() {
      try {
        this.form.loading = true;
        const { data } = await ServiceApi.destroy({ id: this.selectedFarm.id });
        console.log("destroy", JSON.stringify(data));
      } catch (error) {
        console.log("error", error);
      } finally {
        this.form.loading = false;
        this.apiIndex();
      }
    }
  }
};
</script>
