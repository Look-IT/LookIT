package lookIT.lookITspring.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.service.MemorySpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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
            @RequestParam("spotLatitude") Double spotLatitude,
            @RequestParam("spotLongitude") Double spotLongitude,
            @RequestParam("memoryId") Long memoryId
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
            return memorySpotService.createNewMemorySpot(spotLatitude, spotLongitude, memoryId, imageUrl);
        }

    }

    @GetMapping("/photo")
    public List<Map<String, Object>> MemoryPhoto(@RequestParam("memoryId") Long memoryId) throws Exception {
            return memorySpotService.showAllMemorySpotPhotos(memoryId);
    }
}
