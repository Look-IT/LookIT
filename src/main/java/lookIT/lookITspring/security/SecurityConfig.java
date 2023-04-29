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
			.antMatchers("/member/login").permitAll()
			.antMatchers("/member/join").permitAll()
			.antMatchers("/member/join/exists").permitAll()
			.antMatchers("/member").hasRole("USER")
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
