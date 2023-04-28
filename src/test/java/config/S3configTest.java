package config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import lookIT.lookITspring.config.S3config;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {S3config.class})
public class S3configTest {

    @Mock
    private AWSCredentials awsCredentials;

    @Autowired
    private AmazonS3 s3Client;

    @Test
    public void testS3Config() {
        assertNotNull(s3Client);
        assertNotNull(awsCredentials);
    }
}
