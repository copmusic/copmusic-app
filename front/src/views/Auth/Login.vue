<template>
    <div class="login">
        <div>
            <form @submit.prevent="submit">
                <div>
                    <input type="text" name="email" v-model="form.email" />
                </div>
                <div>
                    <input type="password" name="password" v-model="form.password" />
                </div>
                <button type="submit">Submit</button>
            </form>
            <p v-if="showError" id="error">Username or Password is incorrect</p>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Login",
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
        ...mapActions(["login"]),
        async submit() {
            const User = new FormData();
            User.append("email", this.form.email);
            User.append("password", this.form.password);

            try {
                await this.login(User);
                this.$router.push("/authenticated");
                this.showError = false
            } catch (error) {
                this.showError = true
            }
        },
    },
};
</script>
