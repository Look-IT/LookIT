package lookIT.lookITspring.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.Collections;
import lookIT.lookITspring.service.MemorySpotService;
import lookIT.lookITspring.service.Photo4CutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class Photo4cutController {

    private final Photo4CutService photo4CutService;

    @GetMapping("/4cutphoto")
    public String PhotoFrame(@RequestParam("landmarkId") Long landmarkId) throws Exception {
        return photo4CutService.getPhotoFrame(landmarkId);
    }

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    private AmazonS3 s3Client;

    @PostMapping("/4cutphoto")
    public boolean uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("landmarkId") Long landmarkId,
            @RequestParam("userId") Long userId
    ) throws IOException {

        String fileName = file.getOriginalFilename();
        String folderName = "photo4cut/photo";
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
            return photo4CutService.savePhoto4Cut(landmarkId, userId, imageUrl);
        }

    }

    @GetMapping("")
    public List<Collections> Memory4Cut(@RequestParam("userId") Long userId) throws Exception {
        return photo4CutService.getCollectionsByUserId(userId);
    }
}

