package lookIT.lookITspring.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import java.io.File;
import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;

@ExtendWith(MockitoExtension.class)
class S3UploaderTest {

    @Mock
    private AmazonS3Client amazonS3Client;

    private S3Uploader s3Uploader;

    private final String bucketName = "test-bucket";
    private final String dirName = "test-dir";

    @BeforeEach
    void setUp() {
        s3Uploader = new S3Uploader();
        ReflectionTestUtils.setField(s3Uploader, "amazonS3Client", amazonS3Client);
        ReflectionTestUtils.setField(s3Uploader, "bucket", bucketName);
    }

    @Test
    void uploadTest() throws IOException {
        // given
        String fileName = "test-file.txt";
        File file = new File(fileName);
        MockMultipartFile multipartFile = new MockMultipartFile("file", fileName, "text/plain", "test data".getBytes());
        String imageUrl = "https://test-bucket.s3.ap-northeast-2.amazonaws.com/test-dir/test-file.txt";

        when(s3Uploader.convert(multipartFile)).thenReturn(java.util.Optional.of(file));
        when(amazonS3Client.putObject(any())).thenReturn(null);
        when(amazonS3Client.getUrl(bucketName, dirName + "/" + fileName)).thenReturn(new java.net.URL(imageUrl));

        // when
        String uploadImageUrl = s3Uploader.upload(multipartFile, dirName);

        // then
        verify(amazonS3Client).putObject(any());
        verify(amazonS3Client).getUrl(bucketName, dirName + "/" + fileName);
        verify(s3Uploader).removeNewFile(file);
        assertEquals(imageUrl, uploadImageUrl);
    }
}