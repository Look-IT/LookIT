package lookIT.lookITspring.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.formLogin().disable()
			.httpBasic().disable()
			.cors().disable()
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.authorizeRequests()
			.antMatchers("/member").hasRole("USER")
			.antMatchers("/member/login").permitAll()
			.antMatchers("/member/join").permitAll()
			.antMatchers("/member/join/exists").permitAll()
			.antMatchers("/member/logout").permitAll()
			.antMatchers("/member/emailConfirm").permitAll()
			.antMatchers("/member/findPassword").permitAll()
			.antMatchers("/memories/upload").permitAll()
			.antMatchers("/memories/photo").permitAll()
			.antMatchers("/memories/spot").permitAll()
			.antMatchers("/memories/linePath").permitAll()
			.antMatchers("/memories/create").permitAll()
			.antMatchers("/memories").permitAll()
			.antMatchers("/memories/info").permitAll()
			.antMatchers("/memories/info/delete").permitAll()
			.antMatchers("/memories/list").permitAll()
			.antMatchers("/memories/friendList").permitAll()
			.antMatchers("/memories/friendTag").permitAll()
			.antMatchers("/memories/taggedFriendList").permitAll()
			.antMatchers("/main").permitAll()
			.antMatchers("/main/landmarks").permitAll()
			.antMatchers("/collections/4cutphoto").permitAll()
			.antMatchers("/collections/tag").permitAll()
			.antMatchers("/collections/4CutPhotoDelete").permitAll()
			.antMatchers("/collections/*").permitAll()
			.antMatchers("/collections").permitAll()
			.antMatchers("/friends").permitAll()
			.antMatchers("/friends/my").permitAll()
			.antMatchers("/friends/request").permitAll()
			.antMatchers("/friends/accept").permitAll()
			.antMatchers("/friends/reject").permitAll()
			.antMatchers("/friends/list").permitAll()
			.anyRequest().authenticated();
	}

	private static final String[] AUTH_WHITELIST = {
		"/v2/api-docs",
		"/v3/api-docs/**",
		"/configuration/ui",
		"/swagger-resources/**",
		"/configuration/security",
		"/swagger-ui.html",
		"/webjars/**",
		"/file/**",
		"/image/**",
		"/swagger/**",
		"/swagger-ui/**",
		"/h2/**"
	};

	// 정적인 파일 요청에 대해 무시
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(AUTH_WHITELIST);
	}
}
