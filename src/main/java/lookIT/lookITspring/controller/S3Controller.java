package lookIT.lookITspring.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.service.MemorySpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/memories")
@RequiredArgsConstructor
public class S3Controller {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    private MemorySpotService memorySpotService;

    @PostMapping("/upload")
    public boolean uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("spotLatitude") Float spotLatitude,
            @RequestParam("spotLongitude") Float spotLongitude,
            @RequestParam("memoryID") Integer memoryID
            ) throws IOException {

        String fileName = file.getOriginalFilename();
        String folderName = "memoryphoto";
        LocalDateTime now = LocalDateTime.now();
        String nowTime = now.toString();
        System.out.println(nowTime);

        String key = folderName + "/" + fileName + nowTime;
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());

        PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
        request.setCannedAcl(CannedAccessControlList.PublicRead);
        s3Client.putObject(request);

        String imageUrl = s3Client.getUrl(bucket, key).toString();
        if (imageUrl == null) {
            System.out.println("S3 Err - s3Client is null");
            return false;
        }
        else{
            memorySpotService.createNewMemorySpot(spotLatitude, spotLongitude, memoryID, imageUrl);
            return true;
        }

    }
}
