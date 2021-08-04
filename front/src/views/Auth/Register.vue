<template>
    <div class="register">
        <div>
            <form @submit.prevent="submit">
                <div>
                    <input type="text" name="email" v-model="form.email">
                </div>
                <div>
                    <input type="password" name="password" v-model="form.password">
                </div>
                <button type="submit"> Submit</button>
            </form>
        </div>
        <p v-if="showError" id="error">Username already exists</p>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Register",
    components: {},
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            showError: false
        };
    },
    methods: {
        ...mapActions(["register"]),
        async submit() {
            try {
                await this.register(this.form);
                this.$router.push("/");
                this.showError = false
            } catch (error) {
                this.showError = true
            }
        },
    },
};
</script>
